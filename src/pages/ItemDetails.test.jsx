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
