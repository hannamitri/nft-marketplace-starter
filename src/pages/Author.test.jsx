import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Author from "./Author";

jest.mock("axios");

test("loads complete author information and NFTs from the authors API", async () => {
  window.scrollTo = jest.fn();
  Object.assign(navigator, {
    clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
  });
  axios.get.mockResolvedValue({
    data: {
      id: 2,
      authorId: 222,
      authorName: "Second Seller",
      authorImage: "/second.jpg",
      tag: "secondseller",
      address: "0xAuthorBlockchainAddress",
      followers: 632,
      nftCollection: [
        {
          id: 1,
          nftId: 300,
          title: "Seller NFT",
          nftImage: "/nft.jpg",
          price: 2.5,
          likes: 99,
        },
      ],
    },
  });

  render(
    <MemoryRouter initialEntries={["/222/author"]}>
      <Routes>
        <Route path="/:authorId/author" element={<Author />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByRole("status", { name: "Loading author profile" })).toBeInTheDocument();
  expect(await screen.findByRole("heading", { name: /Second Seller/, level: 4 })).toBeInTheDocument();
  expect(screen.getByRole("img", { name: "Second Seller" })).toHaveAttribute("src", "/second.jpg");
  expect(screen.getByText("@secondseller")).toBeInTheDocument();
  expect(screen.getByText("632 followers")).toBeInTheDocument();
  expect(screen.getByText("0xAuthorBlockchainAddress")).toBeInTheDocument();
  expect(screen.getByText("Seller NFT")).toBeInTheDocument();
  expect(screen.getByText("NFT #300")).toBeInTheDocument();
  expect(screen.getByText("2.50 ETH")).toBeInTheDocument();
  expect(screen.getByText("99 likes")).toBeInTheDocument();
  expect(axios.get).toHaveBeenCalledWith(
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=222",
    expect.objectContaining({ timeout: 15000 })
  );

  fireEvent.click(screen.getByRole("button", { name: "Copy address" }));
  await waitFor(() => expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
    "0xAuthorBlockchainAddress"
  ));
  expect(screen.getByRole("button", { name: "Copied" })).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "Follow" }));
  expect(screen.getByText("633 followers")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Unfollow" })).toHaveAttribute(
    "aria-pressed",
    "true"
  );

  fireEvent.click(screen.getByRole("button", { name: "Unfollow" }));
  expect(screen.getByText("632 followers")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Follow" })).toHaveAttribute(
    "aria-pressed",
    "false"
  );
});
