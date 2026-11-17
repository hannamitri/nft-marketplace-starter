import React from "react";
import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import AuthorWorks from "./AuthorWorks";
import { EXPLORE_URL, HOT_COLLECTIONS_URL, NEW_ITEMS_URL } from "../home/marketplaceApi";

const renderWorks = (authorId) =>
  render(
    <MemoryRouter>
      <AuthorWorks authorId={authorId} />
    </MemoryRouter>
  );

afterEach(() => {
  jest.restoreAllMocks();
  delete global.fetch;
});

test("shows all matching images from both feeds in one grid with correct links", async () => {
  global.fetch = jest.fn((url) =>
    Promise.resolve({
      ok: true,
      json: async () =>
        url === NEW_ITEMS_URL
          ? [
              { id: 1, authorId: 42, title: "My item", nftId: 100, nftImage: "/item.jpg", price: 2, likes: 7, expiryDate: 1700000000000 },
              { id: 4, authorId: 42, title: "Another item", nftId: 101, nftImage: "/other-item.jpg", price: 3, likes: 8 },
              { id: 2, authorId: 99, title: "Other item" },
            ]
          : url === HOT_COLLECTIONS_URL ? [
              { id: 1, authorId: 42, title: "My collection", nftId: 200, nftImage: "/collection.jpg", code: 721 },
              { id: 3, authorId: 99, title: "Other collection" },
            ] : [
              { id: 8, authorId: 42, title: "Duplicate item", nftId: 100, nftImage: "/duplicate.jpg" },
              { id: 9, authorId: 42, title: "Explore item", nftId: 300, nftImage: "/explore.jpg" },
            ],
    })
  );

  const { container } = renderWorks("42");
  expect(screen.getByText("Loading new items...")).toBeInTheDocument();
  expect(screen.getByText("Loading collections...")).toBeInTheDocument();
  const item = await screen.findByRole("img", { name: "My item" });
  const collection = await screen.findByRole("img", { name: "My collection" });

  expect(item).toHaveAttribute("src", "/item.jpg");
  expect(item.closest("a")).toHaveAttribute("href", "/item-details/new/1");
  expect(collection.closest("a")).toHaveAttribute("href", "/item-details/1");
  expect(screen.getByRole("img", { name: "Another item" }).closest("a")).toHaveAttribute("href", "/item-details/new/4");
  expect((await screen.findByRole("img", { name: "Explore item" })).closest("a")).toHaveAttribute("href", "/item-details/explore/9");
  expect(screen.queryByRole("img", { name: "Duplicate item" })).not.toBeInTheDocument();
  expect(item.closest(".row")).toBe(collection.closest(".row"));
  expect(container.querySelectorAll(".author-works .row")).toHaveLength(1);
  expect(screen.queryByRole("img", { name: "Other item" })).not.toBeInTheDocument();
  expect(screen.queryByRole("img", { name: "Other collection" })).not.toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /works|new items|collections/i })).not.toBeInTheDocument();
  expect(container.querySelector(".author-works").textContent).toBe("");
});

test("reports when both feeds have no artwork", async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => [] });
  renderWorks("42");
  expect(await screen.findByText("No NFTs found for this author.")).toBeInTheDocument();
});

test("shows available works when the other feed fails", async () => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  global.fetch = jest.fn((url) =>
    Promise.resolve(url === HOT_COLLECTIONS_URL
      ? { ok: false, status: 500 }
      : { ok: true, json: async () => url === EXPLORE_URL ? [] : [{ id: 1, authorId: 42, title: "My item", nftId: 100, nftImage: "/item.jpg", price: 2, likes: 7 }] })
  );
  renderWorks("42");
  expect(await screen.findByRole("img", { name: "My item" })).toBeInTheDocument();
  expect(await screen.findByRole("alert")).toHaveTextContent("Collections could not be loaded.");
  expect(screen.queryByText("No NFTs found for this author.")).not.toBeInTheDocument();
  expect(console.error).toHaveBeenCalled();
});

test("aborts old requests and never shows their results when author changes", async () => {
  const requests = [];
  global.fetch = jest.fn((url, { signal }) => new Promise((resolve) => {
    requests.push({ url, signal, resolve });
  }));
  const { rerender, unmount } = renderWorks("42");
  expect(requests).toHaveLength(3);
  rerender(<MemoryRouter><AuthorWorks authorId="99" /></MemoryRouter>);
  expect(requests[0].signal.aborted).toBe(true);
  expect(requests[1].signal.aborted).toBe(true);
  expect(requests[2].signal.aborted).toBe(true);

  await act(async () => {
    requests[0].resolve({ ok: true, json: async () => [{ id: 1, authorId: 42, title: "Old work" }] });
    requests[3].resolve({ ok: true, json: async () => [] });
    requests[4].resolve({ ok: true, json: async () => [] });
    requests[5].resolve({ ok: true, json: async () => [] });
  });
  expect(screen.queryByRole("img", { name: "Old work" })).not.toBeInTheDocument();
  expect(screen.getByText("No NFTs found for this author.")).toBeInTheDocument();
  unmount();
  expect(requests[3].signal.aborted).toBe(true);
  expect(requests[4].signal.aborted).toBe(true);
  expect(requests[5].signal.aborted).toBe(true);
});
