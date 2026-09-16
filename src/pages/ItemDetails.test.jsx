import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ItemDetails from "./ItemDetails";

jest.mock("axios");

test("loads the item matching the URL ID instead of placeholder details", async () => {
  window.scrollTo = jest.fn();
  axios.get.mockResolvedValue({
    data: [
      { id: 1, title: "First Item", nftImage: "/first.jpg", price: 1, likes: 1 },
      {
        id: 2,
        nftId: 76653783,
        authorId: 55757699,
        authorImage: "/creator.jpg",
        nftImage: "/second.jpg",
        title: "Second Item",
        price: 5.07,
        likes: 69,
        expiryDate: null,
      },
    ],
  });

  render(
    <MemoryRouter initialEntries={["/item-details/2"]}>
      <Routes>
        <Route path="/item-details/:id" element={<ItemDetails />} />
      </Routes>
    </MemoryRouter>
  );

  expect(await screen.findByRole("heading", { name: "Second Item" })).toBeInTheDocument();
  expect(screen.getByRole("img", { name: "Second Item" })).toHaveAttribute("src", "/second.jpg");
  expect(screen.getByText("5.07 ETH")).toBeInTheDocument();
  expect(screen.getByText("69 likes")).toBeInTheDocument();
  expect(screen.getByText("Creator ID: 55757699")).toBeInTheDocument();
  expect(screen.queryByText("First Item")).not.toBeInTheDocument();
});

test("loads an Explore item from the Explore API", async () => {
  window.scrollTo = jest.fn();
  axios.get.mockResolvedValue({
    data: [{
      id: 16,
      nftId: 1600,
      authorId: 900,
      authorImage: "/explore-author.jpg",
      nftImage: "/explore-item.jpg",
      title: "Explore Item",
      price: 0.29,
      likes: 68,
      expiryDate: null,
    }],
  });

  render(
    <MemoryRouter initialEntries={["/explore/item/16"]}>
      <Routes>
        <Route path="/explore/item/:id" element={<ItemDetails />} />
      </Routes>
    </MemoryRouter>
  );

  expect(await screen.findByRole("heading", { name: "Explore Item" })).toBeInTheDocument();
  expect(axios.get).toHaveBeenCalledWith(
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore",
    expect.objectContaining({ timeout: 15000 })
  );
  expect(screen.getByRole("link", { name: "Creator of Explore Item" })).toHaveAttribute(
    "href",
    "/900/author"
  );
  expect(screen.getByRole("link", { name: "Back to Explore" })).toHaveAttribute(
    "href",
    "/explore"
  );
});
