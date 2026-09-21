import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CollectionDetails from "./CollectionDetails";

jest.mock("axios");

test("shows the collection matching the URL ID", async () => {
  window.scrollTo = jest.fn();
  axios.get.mockResolvedValue({
    data: [
      { id: 1, title: "Abstraction", nftImage: "/first.jpg", code: 192 },
      {
        id: 2,
        title: "Patternlicious",
        nftImage: "/second.jpg",
        authorImage: "/creator.jpg",
        nftId: 12345,
        authorId: 67890,
        code: 661,
      },
    ],
  });

  render(
    <MemoryRouter initialEntries={["/collection-details/2"]}>
      <Routes>
        <Route path="/collection-details/:id" element={<CollectionDetails />} />
      </Routes>
    </MemoryRouter>
  );

  expect(await screen.findByRole("heading", { name: "Patternlicious" })).toBeInTheDocument();
  expect(screen.getByRole("img", { name: "Patternlicious" })).toHaveAttribute("src", "/second.jpg");
  expect(screen.getByText("ERC-661")).toBeInTheDocument();
  expect(screen.getByText("NFT ID: 12345")).toBeInTheDocument();
  expect(screen.getByText("Creator ID: 67890")).toBeInTheDocument();
  expect(screen.queryByText("Abstraction")).not.toBeInTheDocument();
});
