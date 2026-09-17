import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ItemDetails from "./ItemDetails";

jest.mock("axios");

const item = {
  id: 51,
  title: "Cartoonism",
  tag: 942,
  description: "A dynamic NFT description.",
  nftImage: "/cartoon.jpg",
  nftId: 17914494,
  ownerName: "Lori Hart",
  ownerId: 73855012,
  ownerImage: "/owner.jpg",
  creatorName: "Nicholas Daniels",
  creatorId: 55757699,
  creatorImage: "/creator.jpg",
  price: 0.29,
  likes: 234,
  views: 468,
};

test("loads complete NFT details, owner, and creator from the itemDetails API", async () => {
  window.scrollTo = jest.fn();
  axios.get.mockResolvedValue({ data: item });

  render(
    <MemoryRouter initialEntries={["/item-details/17914494"]}>
      <Routes>
        <Route path="/item-details/:id" element={<ItemDetails />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByRole("status", { name: "Loading item details" })).toBeInTheDocument();
  expect(await screen.findByRole("heading", { name: "Cartoonism #942" })).toBeInTheDocument();
  expect(screen.getByRole("img", { name: "Cartoonism" })).toHaveAttribute("src", "/cartoon.jpg");
  expect(screen.getByText("468 views")).toBeInTheDocument();
  expect(screen.getByText("234 likes")).toBeInTheDocument();
  expect(screen.getByText("A dynamic NFT description.")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Owner Lori Hart/ })).toHaveAttribute("href", "/73855012/author");
  expect(screen.getByRole("link", { name: /Creator Nicholas Daniels/ })).toHaveAttribute("href", "/55757699/author");
  expect(screen.getByText("0.29 ETH")).toBeInTheDocument();
  expect(axios.get).toHaveBeenCalledWith(
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=17914494",
    expect.objectContaining({ timeout: 15000 })
  );
});

test("keeps the Explore return link while using the itemDetails API", async () => {
  window.scrollTo = jest.fn();
  axios.get.mockResolvedValue({ data: item });

  render(
    <MemoryRouter initialEntries={["/explore/item/17914494"]}>
      <Routes>
        <Route path="/explore/item/:id" element={<ItemDetails />} />
      </Routes>
    </MemoryRouter>
  );

  expect(await screen.findByRole("heading", { name: "Cartoonism #942" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Back to Explore" })).toHaveAttribute("href", "/explore");
});
