import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import HotCollections from "./HotCollections";

jest.mock("axios");

test("links all six API collections to their own details", async () => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
  axios.get.mockResolvedValue({
    data: Array.from({ length: 6 }, (_, index) => ({
      id: index + 1,
      title: `Collection ${index + 1}`,
      nftImage: `/collection-${index + 1}.jpg`,
      authorImage: "/creator.jpg",
      code: index + 100,
    })),
  });

  const { container } = render(<MemoryRouter><HotCollections /></MemoryRouter>);
  await screen.findByRole("heading", { name: "Collection 6" });

  expect(container.querySelectorAll(".keen-slider__slide")).toHaveLength(6);
  expect(screen.getAllByRole("link", { name: "Collection 1" })[0]).toHaveAttribute(
    "href",
    "/collection-details/1"
  );
  expect(screen.getAllByRole("link", { name: "Collection 6" })[0]).toHaveAttribute(
    "href",
    "/collection-details/6"
  );
});
