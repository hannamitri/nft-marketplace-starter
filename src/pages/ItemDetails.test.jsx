import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ItemDetails from "./ItemDetails";
import { EXPLORE_URL } from "../components/home/marketplaceApi";

test("loads explore detail from the explore feed by record ID", async () => {
  jest.spyOn(window, "scrollTo").mockImplementation(() => {});
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => [
      { id: 8, nftId: 453, authorId: 904, title: "Loop Donut", nftImage: "/nft.jpg", authorImage: "/author.jpg", price: 1.85, likes: 32 },
    ],
  });

  const { unmount } = render(
    <MemoryRouter initialEntries={["/item-details/explore/8"]}>
      <Routes><Route path="/item-details/explore/:id" element={<ItemDetails itemType="explore" />} /></Routes>
    </MemoryRouter>
  );
  expect(await screen.findByRole("heading", { name: "Loop Donut" })).toBeInTheDocument();
  expect(screen.getByText("NFT ID: 453")).toBeInTheDocument();
  expect(screen.getByText("1.85")).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledWith(EXPLORE_URL, expect.objectContaining({ signal: expect.any(AbortSignal) }));
  unmount();
  jest.restoreAllMocks();
  delete global.fetch;
});

test("loads a collection item using its author and collection record IDs", async () => {
  jest.spyOn(window, "scrollTo").mockImplementation(() => {});
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    text: async () => JSON.stringify({
      authorId: 73855012, authorName: "Lori Hart", authorImage: "/lori.jpg",
      nftCollection: [{ id: 1, nftId: 525, title: "Papercut", nftImage: "/art.jpg", price: 0.29, likes: 72 }],
    }),
  });
  const { unmount } = render(
    <MemoryRouter initialEntries={["/item-details/author/73855012/1"]}>
      <Routes><Route path="/item-details/author/:authorId/:id" element={<ItemDetails itemType="author" />} /></Routes>
    </MemoryRouter>
  );
  expect(await screen.findByRole("heading", { name: "Papercut" })).toBeInTheDocument();
  expect(screen.getByText("NFT ID: 525")).toBeInTheDocument();
  expect(screen.getByText("0.29")).toBeInTheDocument();
  expect(screen.getByText("Collection owner")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Lori Hart" })).toHaveAttribute("href", "/author/73855012");
  unmount();
  jest.restoreAllMocks();
  delete global.fetch;
});
