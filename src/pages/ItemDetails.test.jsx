import React from "react";
import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes, Link } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import ItemDetails from "./ItemDetails";
import { EXPLORE_URL, HOT_COLLECTIONS_URL, ITEM_DETAILS_URL, NEW_ITEMS_URL } from "../components/home/marketplaceApi";

const item = {
  nftId: 17914494, title: "Cartoonism", tag: 942, description: "An artwork.",
  nftImage: "/art.jpg", ownerId: 73855012, ownerName: "Lori Hart", ownerImage: "/owner.jpg",
  creatorId: 55757699, creatorName: "Nicholas Daniels", creatorImage: "/creator.jpg",
  price: 0.29, likes: 234, views: 468,
};
const detailsResponse = (value) => ({ ok: true, text: async () => value === null ? "" : JSON.stringify(value) });
const renderDetails = (path) => render(
  <MemoryRouter initialEntries={[path]}>
    <Link to="/item-details/nft/2">Next item</Link>
    <Routes>
      <Route path="/item-details/nft/:id" element={<ItemDetails itemType="nft" />} />
      <Route path="/item-details/explore/:id" element={<ItemDetails itemType="explore" />} />
      <Route path="/item-details/new/:id" element={<ItemDetails itemType="new" />} />
      <Route path="/item-details/author/:authorId/:id" element={<ItemDetails itemType="author" />} />
      <Route path="/item-details/:id" element={<ItemDetails />} />
    </Routes>
  </MemoryRouter>
);

beforeEach(() => jest.spyOn(window, "scrollTo").mockImplementation(() => {}));
afterEach(() => {
  jest.restoreAllMocks();
  delete global.fetch;
});

test("loads and displays item details, owner and creator from the NFT API", async () => {
  global.fetch = jest.fn().mockResolvedValue(detailsResponse(item));
  renderDetails("/item-details/nft/17914494");
  expect(screen.getByRole("status")).toHaveTextContent("Loading item details");
  expect(await screen.findByRole("heading", { name: "Cartoonism #942" })).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledWith(`${ITEM_DETAILS_URL}?nftId=17914494`, expect.objectContaining({ signal: expect.any(AbortSignal) }));
  expect(screen.getByRole("img", { name: "Cartoonism" })).toHaveAttribute("src", "/art.jpg");
  expect(screen.getByText("NFT ID: 17914494")).toBeInTheDocument();
  expect(screen.getByText("An artwork.")).toBeInTheDocument();
  expect(screen.getByText("234 likes")).toBeInTheDocument();
  expect(screen.getByText("468 views")).toBeInTheDocument();
  expect(screen.getByText("0.29 ETH")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Lori Hart" })).toHaveAttribute("href", "/author/73855012");
  expect(screen.getByRole("link", { name: "Nicholas Daniels" })).toHaveAttribute("href", "/author/55757699");
});

test.each([
  ["/item-details/explore/8", EXPLORE_URL],
  ["/item-details/new/8", NEW_ITEMS_URL],
  ["/item-details/8", HOT_COLLECTIONS_URL],
])("resolves legacy route %s to the NFT details API", async (path, feedUrl) => {
  global.fetch = jest.fn((url) => Promise.resolve(url === feedUrl
    ? { ok: true, json: async () => [{ id: 8, nftId: item.nftId }] }
    : detailsResponse(item)));
  renderDetails(path);
  expect(await screen.findByRole("heading", { name: "Cartoonism #942" })).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledWith(`${ITEM_DETAILS_URL}?nftId=17914494`, expect.anything());
});

test("resolves legacy author collection routes", async () => {
  global.fetch = jest.fn((url) => Promise.resolve(url.startsWith(ITEM_DETAILS_URL)
    ? detailsResponse(item)
    : detailsResponse({ authorId: 73855012, authorName: "Lori Hart", authorImage: "/owner.jpg", nftCollection: [{ id: 2, nftId: item.nftId }] })));
  renderDetails("/item-details/author/73855012/2");
  expect(await screen.findByRole("heading", { name: "Cartoonism #942" })).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledWith(`${ITEM_DETAILS_URL}?nftId=17914494`, expect.anything());
});

test.each([
  { ok: false, status: 500 },
  detailsResponse(null),
  detailsResponse({ ...item, nftId: 1 }),
  { ok: true, text: async () => "not json" },
])("reports missing, failed, or invalid detail responses", async (response) => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  global.fetch = jest.fn().mockResolvedValue(response);
  renderDetails("/item-details/nft/17914494");
  expect(await screen.findByRole("alert")).toHaveTextContent("Item details could not be loaded.");
  expect(console.error).toHaveBeenCalled();
});

test("aborts old requests on route changes and ignores stale responses", async () => {
  const requests = [];
  global.fetch = jest.fn((url, { signal }) => new Promise((resolve) => requests.push({ signal, resolve })));
  renderDetails("/item-details/nft/17914494");
  userEvent.click(screen.getByRole("link", { name: "Next item" }));
  expect(requests[0].signal.aborted).toBe(true);
  await act(async () => {
    requests[1].resolve(detailsResponse({ ...item, nftId: 2, title: "Next" }));
    requests[0].resolve(detailsResponse(item));
  });
  expect(screen.getByRole("heading", { name: "Next #942" })).toBeInTheDocument();
  expect(screen.queryByText("Cartoonism #942")).not.toBeInTheDocument();
});
