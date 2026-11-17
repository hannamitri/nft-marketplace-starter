import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes, Link } from "react-router-dom";
import AuthorProfile from "./AuthorProfile";
import { EXPLORE_URL, HOT_COLLECTIONS_URL, NEW_ITEMS_URL } from "../components/home/marketplaceApi";

const author = {
  id: 6, authorId: 73855012, authorName: "Lori Hart", authorImage: "/lori.jpg",
  tag: "harttttt", address: "example-address", followers: 632,
  nftCollection: [{ id: 1, nftId: 525, title: "Papercut", nftImage: "/papercut.jpg", price: 0.29, likes: 72 }],
};
const response = (data) => ({ ok: true, text: async () => data === null ? "" : JSON.stringify(data) });
const renderProfile = (id = "73855012") => {
  const authorFetch = global.fetch;
  global.fetch = jest.fn((url, options) =>
    [EXPLORE_URL, HOT_COLLECTIONS_URL, NEW_ITEMS_URL].includes(url)
      ? Promise.resolve({ ok: true, json: async () => [] })
      : authorFetch(url, options)
  );
  return render(
  <MemoryRouter initialEntries={[`/author/${id}`]}>
    <Link to="/author/83937449">Other author</Link>
    <Routes><Route path="/author/:id" element={<AuthorProfile />} /></Routes>
  </MemoryRouter>
  );
};

beforeEach(() => {
  jest.spyOn(window, "scrollTo").mockImplementation(() => {});
  window.localStorage.clear();
});
afterEach(() => {
  jest.restoreAllMocks();
  delete global.fetch;
  window.localStorage.clear();
});

test("loads the requested author and displays API fields and collection", async () => {
  let resolve;
  global.fetch = jest.fn(() => new Promise((done) => { resolve = done; }));
  const { container } = renderProfile();
  expect(screen.getByText("Loading author profile...")).toBeInTheDocument();
  expect(container.querySelectorAll(".author-profile__skeleton .skeleton-box")).toHaveLength(6);
  expect(container.querySelectorAll(".author-profile__follow-skeleton .skeleton-box")).toHaveLength(2);
  expect(screen.getByText("Loading NFTs...")).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledWith(
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=73855012",
    expect.objectContaining({ signal: expect.any(AbortSignal) })
  );
  await act(async () => resolve(response(author)));
  expect(screen.getByRole("heading", { name: "Lori Hart" })).toBeInTheDocument();
  expect(screen.getByText("@harttttt")).toBeInTheDocument();
  expect(screen.getByText("Address: example-address")).toBeInTheDocument();
  expect(screen.getByText("632 followers")).toBeInTheDocument();
  expect(screen.getByText("Author record ID: 6")).toBeInTheDocument();
  expect(screen.getByRole("img", { name: "Papercut" }).closest("a")).toHaveAttribute("href", "/item-details/author/73855012/1");
});

test("reports an author not found when the API returns an empty response", async () => {
  global.fetch = jest.fn().mockResolvedValue(response(null));
  renderProfile("123");
  expect(await screen.findByRole("alert")).toHaveTextContent("Author not found.");
});

test.each([
  { ok: false, status: 500 },
  { ok: true, text: async () => "not json" },
  response({ ...author, authorId: 999 }),
])("reports request and invalid data errors", async (apiResponse) => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  global.fetch = jest.fn().mockResolvedValue(apiResponse);
  renderProfile();
  expect(await screen.findByRole("alert")).toHaveTextContent("Author profile could not be loaded.");
  expect(console.error).toHaveBeenCalled();
});

test("aborts old requests on route change and ignores their responses", async () => {
  const requests = [];
  global.fetch = jest.fn((url, { signal }) => new Promise((resolve) => requests.push({ signal, resolve })));
  const { unmount } = renderProfile();
  userEvent.click(screen.getByText("Other author"));
  expect(requests[0].signal.aborted).toBe(true);
  await act(async () => {
    requests[1].resolve(response({ ...author, authorId: 83937449, authorName: "Monica" }));
    requests[0].resolve(response(author));
  });
  expect(screen.getByRole("heading", { name: "Monica" })).toBeInTheDocument();
  expect(screen.queryByText("Lori Hart")).not.toBeInTheDocument();
  unmount();
  expect(requests[1].signal.aborted).toBe(true);
});

test("adds and removes a local follower and remembers the choice", async () => {
  global.fetch = jest.fn().mockResolvedValue(response(author));
  const { unmount } = renderProfile();
  await screen.findByText("632 followers");
  userEvent.click(screen.getByRole("button", { name: "Follow" }));
  expect(screen.getByRole("button", { name: "Unfollow" })).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByText("633 followers")).toBeInTheDocument();
  expect(screen.getByText("Follow and count adjustment are saved in this browser only.")).toBeInTheDocument();
  unmount();
  renderProfile();
  expect(await screen.findByRole("button", { name: "Unfollow" })).toBeInTheDocument();
  expect(screen.getByText("633 followers")).toBeInTheDocument();
  userEvent.click(screen.getByRole("button", { name: "Unfollow" }));
  expect(screen.getByRole("button", { name: "Follow" })).toHaveAttribute("aria-pressed", "false");
  expect(screen.getByText("632 followers")).toBeInTheDocument();
  expect(window.localStorage.getItem("ultraverse:follow:v1:73855012")).toBeNull();
});

test("copies ID and address and reports clipboard errors", async () => {
  const clipboard = navigator.clipboard;
  const writeText = jest.fn().mockResolvedValueOnce().mockResolvedValueOnce().mockRejectedValueOnce(new Error("denied"));
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
  jest.spyOn(console, "error").mockImplementation(() => {});
  global.fetch = jest.fn().mockResolvedValue(response(author));
  try {
    renderProfile();
    await screen.findByRole("heading", { name: "Lori Hart" });
    userEvent.click(screen.getByRole("button", { name: "Copy ID" }));
    expect(await screen.findByText("Author ID copied.")).toBeInTheDocument();
    expect(writeText).toHaveBeenCalledWith("73855012");
    userEvent.click(screen.getByRole("button", { name: "Copy address" }));
    expect(await screen.findByText("Address copied.")).toBeInTheDocument();
    expect(writeText).toHaveBeenCalledWith("example-address");
    userEvent.click(screen.getByRole("button", { name: "Copy ID" }));
    expect(await screen.findByText("Could not copy Author ID. Please copy it manually.")).toBeInTheDocument();
  } finally {
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: clipboard });
  }
});

test("reports a storage failure without claiming a successful follow", async () => {
  global.fetch = jest.fn().mockResolvedValue(response(author));
  jest.spyOn(console, "error").mockImplementation(() => {});
  jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("storage disabled"); });
  renderProfile();
  await screen.findByRole("heading", { name: "Lori Hart" });
  userEvent.click(screen.getByRole("button", { name: "Follow" }));
  expect(screen.getByRole("alert")).toHaveTextContent("Could not save your follow preference.");
  expect(screen.getByRole("button", { name: "Follow" })).toHaveAttribute("aria-pressed", "false");
  expect(screen.getByText("632 followers")).toBeInTheDocument();
});
