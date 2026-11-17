import React from "react";
import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import AuthorWorks from "./AuthorWorks";
import { EXPLORE_URL, HOT_COLLECTIONS_URL, NEW_ITEMS_URL } from "../home/marketplaceApi";

afterEach(() => {
  jest.restoreAllMocks();
  delete global.fetch;
});

test("combines the collection and matching feeds, deduplicating NFTs by ID", async () => {
  const feeds = {
    [NEW_ITEMS_URL]: [
      { id: 1, nftId: 100, authorId: 42, title: "Duplicate", nftImage: "/duplicate.jpg" },
      { id: 2, nftId: 200, authorId: 42, title: "New NFT", nftImage: "/new.jpg" },
      { id: 3, nftId: 300, authorId: 99, title: "Other author", nftImage: "/other.jpg" },
    ],
    [HOT_COLLECTIONS_URL]: [{ id: 1, nftId: 400, authorId: 42, title: "Collection NFT", nftImage: "/collection.jpg" }],
    [EXPLORE_URL]: [{ id: 1, nftId: 500, authorId: 42, title: "Explore NFT", nftImage: "/explore.jpg" }],
  };
  global.fetch = jest.fn((url) => Promise.resolve({ ok: true, json: async () => feeds[url] }));
  const { container } = render(<MemoryRouter><AuthorWorks authorId="42" authorName="Lori Hart" authorImage="/lori.jpg" items={[{ id: 1, nftId: 100, title: "Owned NFT", nftImage: "/owned.jpg" }]} /></MemoryRouter>);
  expect(screen.getByRole("img", { name: "Owned NFT" }).closest("a")).toHaveAttribute("href", "/item-details/nft/100");
  expect((await screen.findByRole("img", { name: "New NFT" })).closest("a")).toHaveAttribute("href", "/item-details/nft/200");
  expect((await screen.findByRole("img", { name: "Collection NFT" })).closest("a")).toHaveAttribute("href", "/item-details/nft/400");
  expect((await screen.findByRole("img", { name: "Explore NFT" })).closest("a")).toHaveAttribute("href", "/item-details/nft/500");
  expect(screen.queryByRole("img", { name: "Duplicate" })).not.toBeInTheDocument();
  expect(screen.queryByRole("img", { name: "Other author" })).not.toBeInTheDocument();
  const profileLinks = screen.getAllByRole("link", { name: "Lori Hart profile" });
  expect(profileLinks).toHaveLength(4);
  profileLinks.forEach((link) => {
    expect(link).toHaveAttribute("href", "/author/42");
    expect(link.querySelector("img")).toHaveAttribute("src", "/lori.jpg");
    expect(link.querySelector(".author-works__badge")).toHaveClass("fa-check");
    expect(link.querySelector(".author-works__badge")).toHaveAttribute("aria-hidden", "true");
  });
  expect(container.querySelector(".author-works").textContent).toBe("");
});

test("shows loading and empty states only after all feeds finish", async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => [] });
  const { rerender, container } = render(<MemoryRouter><AuthorWorks authorId="42" items={[]} loading /></MemoryRouter>);
  expect(screen.getByRole("status")).toHaveTextContent("Loading NFTs...");
  expect(container.querySelectorAll(".skeleton-box")).toHaveLength(8);
  await act(async () => {});
  rerender(<MemoryRouter><AuthorWorks authorId="42" items={[]} /></MemoryRouter>);
  expect(screen.getByText("No NFTs found for this author.")).toBeInTheDocument();
});

test("keeps available NFTs and reports an unavailable feed", async () => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  global.fetch = jest.fn((url) => Promise.resolve(url === EXPLORE_URL
    ? { ok: false, status: 500 }
    : { ok: true, json: async () => [] }));
  render(<MemoryRouter><AuthorWorks authorId="42" items={[{ id: 1, nftId: 100, title: "Owned NFT", nftImage: "/owned.jpg" }]} /></MemoryRouter>);
  expect(screen.getByRole("img", { name: "Owned NFT" })).toBeInTheDocument();
  expect(await screen.findByRole("alert")).toHaveTextContent("Explore NFTs could not be loaded.");
  expect(screen.queryByText("No NFTs found for this author.")).not.toBeInTheDocument();
});

test("aborts old feed requests and ignores responses after author changes", async () => {
  const requests = [];
  global.fetch = jest.fn((url, { signal }) => new Promise((resolve) => requests.push({ signal, resolve })));
  const { rerender, unmount } = render(<MemoryRouter><AuthorWorks authorId="42" items={[]} /></MemoryRouter>);
  rerender(<MemoryRouter><AuthorWorks authorId="99" items={[]} /></MemoryRouter>);
  expect(requests.slice(0, 3).every((request) => request.signal.aborted)).toBe(true);
  await act(async () => {
    requests[0].resolve({ ok: true, json: async () => [{ id: 1, authorId: 42, title: "Stale" }] });
    requests.slice(3).forEach((request) => request.resolve({ ok: true, json: async () => [] }));
  });
  expect(screen.queryByRole("img", { name: "Stale" })).not.toBeInTheDocument();
  expect(screen.getByText("No NFTs found for this author.")).toBeInTheDocument();
  unmount();
  expect(requests.slice(3).every((request) => request.signal.aborted)).toBe(true);
});
