import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Author from "./Author";

jest.mock("axios");

test("loads the seller matching the author ID in the URL", async () => {
  window.scrollTo = jest.fn();
  axios.get.mockImplementation((url) => {
    if (url.endsWith("/topSellers")) return Promise.resolve({ data: [
      {
        id: 1,
        authorId: 111,
        authorName: "First Seller",
        authorImage: "/first.jpg",
        price: 1.2,
      },
      {
        id: 2,
        authorId: 222,
        authorName: "Second Seller",
        authorImage: "/second.jpg",
        price: 7.2,
      },
    ] });
    if (url.endsWith("/newItems")) return Promise.resolve({ data: [
      { id: 10, authorId: 222, title: "Seller NFT", nftImage: "/nft.jpg", price: 2.5 },
    ] });
    if (url.endsWith("/hotCollections")) return Promise.resolve({ data: [
      { id: 20, authorId: 222, title: "Seller Collection", nftImage: "/collection.jpg" },
    ] });
    return Promise.resolve({ data: [
      { id: 30, nftId: 300, authorId: 222, title: "Explore NFT", nftImage: "/explore.jpg" },
    ] });
  });

  render(
    <MemoryRouter initialEntries={["/222/author"]}>
      <Routes>
        <Route path="/:authorId/author" element={<Author />} />
      </Routes>
    </MemoryRouter>
  );

  expect(await screen.findByRole("heading", { name: /Second Seller/, level: 4 })).toBeInTheDocument();
  expect(screen.getByRole("img", { name: "Second Seller" })).toHaveAttribute(
    "src",
    "/second.jpg"
  );
  expect(screen.getByText("Author ID: 222")).toBeInTheDocument();
  expect(screen.getByText("Top seller total: 7.2 ETH")).toBeInTheDocument();
  expect(screen.queryByText("First Seller")).not.toBeInTheDocument();
  expect(screen.queryByText("Pinky Ocean")).not.toBeInTheDocument();
  expect(screen.getByText("Seller NFT")).toBeInTheDocument();
  expect(screen.getByText("Seller Collection")).toBeInTheDocument();
  expect(screen.getByText("Explore NFT")).toBeInTheDocument();
  expect(screen.getByText("2.50 ETH")).toBeInTheDocument();
  expect(screen.getByText("New Item")).toBeInTheDocument();
  expect(screen.getByText("Hot Collection")).toBeInTheDocument();
  expect(screen.getByText("Explore")).toBeInTheDocument();
});
