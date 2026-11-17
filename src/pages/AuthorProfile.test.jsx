import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AuthorProfile from "./AuthorProfile";
import { TOP_SELLERS_URL } from "../components/home/topSellersApi";
import { EXPLORE_URL, HOT_COLLECTIONS_URL, NEW_ITEMS_URL } from "../components/home/marketplaceApi";

const mockSellers = (sellers) => {
  global.fetch = jest.fn((url) =>
    Promise.resolve({
      ok: true,
      json: async () => (url === TOP_SELLERS_URL ? sellers : []),
    })
  );
};

const renderProfile = (id) =>
  render(
    <MemoryRouter initialEntries={[`/author/${id}`]}>
      <Routes>
        <Route path="/author/:id" element={<AuthorProfile />} />
      </Routes>
    </MemoryRouter>
  );

beforeEach(() => {
  jest.spyOn(window, "scrollTo").mockImplementation(() => {});
  window.localStorage.removeItem("ultraverse:follow:v1:73855012");
});

afterEach(() => {
  jest.restoreAllMocks();
  delete global.fetch;
  window.localStorage.removeItem("ultraverse:follow:v1:73855012");
});

test("shows a skeleton while loading, then the requested author", async () => {
  let resolveRequest;
  global.fetch = jest.fn((url) =>
    url === TOP_SELLERS_URL
      ? new Promise((resolve) => { resolveRequest = resolve; })
      : Promise.resolve({ ok: true, json: async () => [] })
  );
  const { container } = renderProfile("73855012");

  expect(screen.getByText("Loading author profile...")).toBeInTheDocument();
  expect(container.querySelectorAll(".author-profile__skeleton .skeleton-box")).toHaveLength(4);
  await act(async () => {
    resolveRequest({
      ok: true,
      json: async () => [
        { authorId: 83937449, authorName: "Monica Lucas", authorImage: "/monica.jpg", price: 1.2 },
        { authorId: 73855012, authorName: "Lori Hart", authorImage: "/lori.jpg", price: 7.2 },
      ],
    });
  });

  expect(screen.getByRole("heading", { name: "Lori Hart" })).toBeInTheDocument();
  expect(screen.getByRole("img", { name: "Lori Hart" })).toHaveAttribute("src", "/lori.jpg");
  expect(screen.getByText("Author ID: 73855012")).toBeInTheDocument();
  expect(screen.getByText("7.2 ETH")).toBeInTheDocument();
  expect(screen.queryByText("Loading author profile...")).not.toBeInTheDocument();
});

test("reports an author that is not in the API", async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => [] });
  renderProfile("123");
  expect(await screen.findByRole("alert")).toHaveTextContent("Author not found.");
});

test("loads the author's works alongside the profile", async () => {
  const feeds = {
    [TOP_SELLERS_URL]: [{ id: 2, authorId: 73855012, authorName: "Lori Hart", authorImage: "/lori.jpg", price: 7.2 }],
    [NEW_ITEMS_URL]: [{ id: 1, authorId: 73855012, title: "Running Puppets", nftId: 1, nftImage: "/item.jpg", price: 1, likes: 2 }],
    [HOT_COLLECTIONS_URL]: [{ id: 2, authorId: 73855012, title: "Patternlicious", nftId: 2, nftImage: "/collection.jpg", code: 721 }],
    [EXPLORE_URL]: [{ id: 3, authorId: 73855012, title: "Explore artwork", nftId: 3, nftImage: "/explore.jpg" }],
  };
  global.fetch = jest.fn((url) =>
    Promise.resolve({ ok: true, json: async () => feeds[url] })
  );
  renderProfile("73855012");
  expect(global.fetch).toHaveBeenCalledTimes(4);
  expect(await screen.findByRole("heading", { name: "Lori Hart" })).toBeInTheDocument();
  expect(await screen.findByRole("img", { name: "Running Puppets" })).toBeInTheDocument();
  expect(await screen.findByRole("img", { name: "Patternlicious" })).toBeInTheDocument();
  expect(await screen.findByRole("img", { name: "Explore artwork" })).toBeInTheDocument();
  expect(screen.getByText("Seller record ID: 2")).toBeInTheDocument();
});

test("shows an explore creator without a seller record", async () => {
  global.fetch = jest.fn((url) => Promise.resolve({
    ok: true,
    json: async () => url === EXPLORE_URL
      ? [{ id: 16, authorId: 1, authorImage: "/creator.jpg", title: "Teal Ocean", nftId: 16, nftImage: "/nft.jpg" }]
      : [],
  }));
  renderProfile("1");
  expect(await screen.findByRole("heading", { name: "Creator #1" })).toBeInTheDocument();
  expect(await screen.findByRole("img", { name: "Teal Ocean" })).toBeInTheDocument();
  expect(screen.queryByText(/Seller record ID/)).not.toBeInTheDocument();
});

test("reports a request failure", async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 500 });
  jest.spyOn(console, "error").mockImplementation(() => {});
  renderProfile("123");
  expect(await screen.findByRole("alert")).toHaveTextContent("Author profile could not be loaded.");
  expect(console.error).toHaveBeenCalled();
});

test("aborts an in-flight request on unmount", () => {
  global.fetch = jest.fn(() => new Promise(() => {}));
  const { unmount } = renderProfile("123");
  const { signal } = global.fetch.mock.calls[0][1];
  unmount();
  expect(signal.aborted).toBe(true);
});

test("follows and unfollows locally and remembers the choice after remount", async () => {
  mockSellers([
    { authorId: 73855012, authorName: "Lori Hart", authorImage: "/lori.jpg", price: 7.2 },
  ]);
  const { unmount } = renderProfile("73855012");
  await screen.findByRole("heading", { name: "Lori Hart" });
  expect(screen.getByText("0 followers in this browser")).toBeInTheDocument();

  userEvent.click(screen.getByRole("button", { name: "Follow" }));
  expect(screen.getByText("1 follower in this browser")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Following" })).toHaveAttribute("aria-pressed", "true");
  unmount();

  renderProfile("73855012");
  await screen.findByRole("heading", { name: "Lori Hart" });
  expect(screen.getByRole("button", { name: "Following" })).toBeInTheDocument();
  userEvent.click(screen.getByRole("button", { name: "Following" }));
  expect(screen.getByText("0 followers in this browser")).toBeInTheDocument();
  expect(window.localStorage.getItem("ultraverse:follow:v1:73855012")).toBeNull();
});

test("copies the author ID and reports clipboard failures", async () => {
  const clipboard = navigator.clipboard;
  const writeText = jest.fn().mockResolvedValueOnce().mockRejectedValueOnce(new Error("denied"));
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
  jest.spyOn(console, "error").mockImplementation(() => {});
  mockSellers([
    { authorId: 73855012, authorName: "Lori Hart", authorImage: "/lori.jpg", price: 7.2 },
  ]);
  try {
    renderProfile("73855012");
    await screen.findByRole("heading", { name: "Lori Hart" });
    userEvent.click(screen.getByRole("button", { name: "Copy ID" }));
    expect(await screen.findByText("Author ID copied.")).toBeInTheDocument();
    expect(writeText).toHaveBeenCalledWith("73855012");
    userEvent.click(screen.getByRole("button", { name: "Copy ID" }));
    expect(await screen.findByText("Could not copy author ID. Please copy it manually.")).toBeInTheDocument();
  } finally {
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: clipboard });
  }
});

test("reports a storage failure without claiming a successful follow", async () => {
  mockSellers([
    { authorId: 73855012, authorName: "Lori Hart", authorImage: "/lori.jpg", price: 7.2 },
  ]);
  jest.spyOn(console, "error").mockImplementation(() => {});
  jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw new Error("storage disabled");
  });
  renderProfile("73855012");
  await screen.findByRole("heading", { name: "Lori Hart" });
  userEvent.click(screen.getByRole("button", { name: "Follow" }));
  expect(screen.getByRole("alert")).toHaveTextContent("Could not save your follow preference.");
  expect(screen.getByText("0 followers in this browser")).toBeInTheDocument();
});
