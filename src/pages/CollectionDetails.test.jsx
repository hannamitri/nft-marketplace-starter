import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CollectionDetails from "./CollectionDetails";

jest.mock("axios");

test("loads the selected collection and links to its author", async () => {
  window.scrollTo = jest.fn();
  axios.get.mockResolvedValue({ data: [{
    id: 2,
    title: "Patternlicious",
    nftImage: "/collection.jpg",
    authorImage: "/creator.jpg",
    authorId: 222,
    nftId: 12345,
    code: 661,
  }] });

  render(
    <MemoryRouter initialEntries={["/collection-details/2"]}>
      <Routes>
        <Route path="/collection-details/:id" element={<CollectionDetails />} />
      </Routes>
    </MemoryRouter>
  );

  expect(await screen.findByRole("heading", { name: "Patternlicious" })).toBeInTheDocument();
  expect(screen.getByText("ERC-661")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Creator of Patternlicious" })).toHaveAttribute(
    "href",
    "/222/author"
  );
});
