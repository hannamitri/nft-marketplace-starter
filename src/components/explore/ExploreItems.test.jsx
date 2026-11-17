import React from "react";
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import ExploreItems from "./ExploreItems";
import { EXPLORE_URL } from "../home/marketplaceApi";

const items = Array.from({ length: 16 }, (_, index) => ({
  id: index + 1,
  authorId: index + 10,
  authorImage: `/author-${index}.jpg`,
  nftImage: `/nft-${index}.jpg`,
  title: `NFT ${index + 1}`,
  price: index + 1,
  likes: index + 2,
  expiryDate: index === 0 ? 1800000000000 : null,
}));

const renderItems = () => render(<MemoryRouter><ExploreItems /></MemoryRouter>);

afterEach(() => {
  jest.restoreAllMocks();
  delete global.fetch;
});

test("shows skeletons then 8 NFTs and reveals 4 at a time", async () => {
  let resolve;
  global.fetch = jest.fn(() => new Promise((done) => { resolve = done; }));
  const { container } = renderItems();
  expect(screen.getByRole("status")).toHaveTextContent("Loading NFTs...");
  expect(container.querySelectorAll(".explore-skeleton")).toHaveLength(8);
  expect(global.fetch).toHaveBeenCalledWith(EXPLORE_URL, expect.objectContaining({ signal: expect.any(AbortSignal) }));
  await act(async () => resolve({ ok: true, json: async () => items }));
  expect(container.querySelectorAll(".explore-item")).toHaveLength(8);
  expect(screen.getByRole("img", { name: "NFT 1" }).closest("a")).toHaveAttribute("href", "/item-details/explore/1");
  expect(screen.getByRole("link", { name: "NFT 1 creator" })).toHaveAttribute("href", "/author/10");
  expect(screen.getByText("1 ETH")).toBeInTheDocument();
  expect(screen.getByLabelText("2 likes")).toBeInTheDocument();
  expect(within(container.querySelector(".explore-item")).getByLabelText(/Time remaining:/)).toBeInTheDocument();
  expect(container.querySelectorAll(".de_countdown")).toHaveLength(1);
  userEvent.click(screen.getByRole("button", { name: "Show more" }));
  expect(container.querySelectorAll(".explore-item")).toHaveLength(12);
  userEvent.click(screen.getByRole("button", { name: "Show more" }));
  expect(container.querySelectorAll(".explore-item")).toHaveLength(16);
  expect(screen.queryByRole("button", { name: "Show more" })).not.toBeInTheDocument();
});

test.each([
  ["price_low_to_high", "price_low_to_high", items, "NFT 1"],
  ["price_high_to_low", "price_high_to_low", [...items].reverse(), "NFT 16"],
  ["likes_high_to_low", "likes_high_to_low", [...items].reverse(), "NFT 16"],
  ["likes_low_to_high", "likes_high_to_low", [...items].reverse(), "NFT 1"],
])("requests %s and displays the expected order", async (selection, apiFilter, responseItems, firstTitle) => {
  let resolveFiltered;
  global.fetch = jest.fn((url) => url === EXPLORE_URL
    ? Promise.resolve({ ok: true, json: async () => items })
    : new Promise((resolve) => { resolveFiltered = resolve; })
  );
  const { container } = renderItems();
  await screen.findByText("NFT 1", { selector: "h4" });
  userEvent.click(screen.getByRole("button", { name: "Show more" }));
  expect(container.querySelectorAll(".explore-item")).toHaveLength(12);
  userEvent.selectOptions(screen.getByLabelText("Sort NFTs"), selection);
  expect(global.fetch).toHaveBeenLastCalledWith(`${EXPLORE_URL}?filter=${apiFilter}`, expect.objectContaining({ signal: expect.any(AbortSignal) }));
  expect(screen.getByRole("status")).toHaveTextContent("Loading NFTs...");
  expect(container.querySelectorAll(".explore-skeleton")).toHaveLength(8);
  expect(container.querySelectorAll(".explore-item")).toHaveLength(0);
  await act(async () => resolveFiltered({ ok: true, json: async () => responseItems }));
  expect(container.querySelector(".explore-item h4")).toHaveTextContent(firstTitle);
  expect(container.querySelectorAll(".explore-item")).toHaveLength(8);
  userEvent.click(screen.getByRole("button", { name: "Show more" }));
  expect(container.querySelectorAll(".explore-item")).toHaveLength(12);
});

test("ignores stale responses when filters change rapidly and resets to default", async () => {
  const requests = [];
  global.fetch = jest.fn((url, { signal }) => new Promise((resolve) => {
    requests.push({ url, signal, resolve });
  }));
  renderItems();
  userEvent.selectOptions(screen.getByLabelText("Sort NFTs"), "likes_high_to_low");
  userEvent.selectOptions(screen.getByLabelText("Sort NFTs"), "price_low_to_high");
  expect(requests[0].signal.aborted).toBe(true);
  expect(requests[1].signal.aborted).toBe(true);
  await act(async () => {
    requests[2].resolve({ ok: true, json: async () => [items[2]] });
    requests[1].resolve({ ok: true, json: async () => [items[1]] });
    requests[0].resolve({ ok: true, json: async () => [items[0]] });
  });
  expect(screen.getByText("NFT 3", { selector: "h4" })).toBeInTheDocument();
  expect(screen.queryByText("NFT 2", { selector: "h4" })).not.toBeInTheDocument();
  userEvent.selectOptions(screen.getByLabelText("Sort NFTs"), "");
  expect(requests[3].url).toBe(EXPLORE_URL);
  expect(screen.getByRole("status")).toHaveTextContent("Loading NFTs...");
  await act(async () => requests[3].resolve({ ok: true, json: async () => items }));
  expect(screen.getByText("NFT 1", { selector: "h4" })).toBeInTheDocument();
});

test("reports a filtered request failure without showing the previous results", async () => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  global.fetch = jest.fn((url) => Promise.resolve(url === EXPLORE_URL
    ? { ok: true, json: async () => items }
    : { ok: false, status: 500 }));
  renderItems();
  await screen.findByText("NFT 1", { selector: "h4" });
  userEvent.selectOptions(screen.getByLabelText("Sort NFTs"), "likes_high_to_low");
  expect(await screen.findByRole("alert")).toHaveTextContent("NFTs could not be loaded.");
  expect(screen.queryByText("NFT 1", { selector: "h4" })).not.toBeInTheDocument();
});

test.each([
  [{ ok: false, status: 500 }],
  [{ ok: true, json: async () => ({}) }],
])("reports failed and malformed responses", async (response) => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  global.fetch = jest.fn().mockResolvedValue(response);
  renderItems();
  expect(await screen.findByRole("alert")).toHaveTextContent("NFTs could not be loaded.");
  expect(console.error).toHaveBeenCalled();
});

test("shows an empty state and aborts in-flight requests", async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => [] });
  const { unmount } = renderItems();
  expect(await screen.findByText("No NFTs found.")).toBeInTheDocument();
  const signal = global.fetch.mock.calls[0][1].signal;
  unmount();
  expect(signal.aborted).toBe(true);
});
