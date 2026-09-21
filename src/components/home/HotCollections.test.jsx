import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import HotCollections from "./HotCollections";

jest.mock("axios");

test("maps collections to their details and author routes", async () => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
  axios.get.mockResolvedValue({ data: [{
    id: 1,
    title: "Abstraction",
    nftImage: "/collection.jpg",
    authorImage: "/creator.jpg",
    authorId: 111,
    code: 192,
  }] });

  render(<MemoryRouter><HotCollections /></MemoryRouter>);

  expect(screen.getByRole("status", { name: "Loading hot collections" })).toBeInTheDocument();
  expect(await screen.findByRole("heading", { name: "Abstraction" })).toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: "Abstraction" })[0]).toHaveAttribute(
    "href",
    "/collection-details/1"
  );
  expect(screen.getByRole("link", { name: "View creator of Abstraction" })).toHaveAttribute(
    "href",
    "/111/author"
  );
});
