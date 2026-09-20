import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import ExploreItems from "./ExploreItems";

jest.mock("axios");

test("shows 8 API items first and loads 4 more per click", async () => {
  jest.spyOn(Date, "now").mockReturnValue(1000000);
  const items = Array.from({ length: 16 }, (_, index) => ({
    id: index + 1,
    authorId: 2000 + index,
    authorImage: `/author-${index + 1}.jpg`,
    nftImage: `/nft-${index + 1}.jpg`,
    title: `Explore Item ${index + 1}`,
    price: index + 0.5,
    likes: index + 10,
    expiryDate: index === 0 ? 1005000 : null,
  }));
  axios.get.mockResolvedValue({ data: items });

  try {
    const { container } = render(<MemoryRouter><ExploreItems /></MemoryRouter>);
    expect(screen.getByRole("status", { name: "Loading Explore items" })).toBeInTheDocument();
    await screen.findByText("Explore Item 8");

    expect(container.querySelectorAll(".nft__item")).toHaveLength(8);
    expect(container.querySelector(".explore-item")).toHaveClass("col-md-3", "col-sm-6", "col-xs-12");
    expect(screen.queryByText("Explore Item 9")).not.toBeInTheDocument();
    expect(screen.getByText("0h 0m 5s")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View creator of Explore Item 1" })).toHaveAttribute(
      "href",
      "/2000/author"
    );
    expect(screen.getAllByRole("link", { name: "Explore Item 1" })[0]).toHaveAttribute(
      "href",
      "/explore/item/1"
    );

    fireEvent.click(screen.getByRole("button", { name: "Load more" }));
    expect(container.querySelectorAll(".nft__item")).toHaveLength(12);
    expect(screen.getByText("Explore Item 12")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Load more" }));
    expect(container.querySelectorAll(".nft__item")).toHaveLength(16);
    expect(screen.getByText("Explore Item 16")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Load more" })).not.toBeInTheDocument();
  } finally {
    Date.now.mockRestore();
  }
});

test("requests likes ordering from the backend instead of sorting locally", async () => {
  const defaultItems = [{
    id: 1, authorId: 1, authorImage: "/author.jpg", nftImage: "/low.jpg",
    title: "Low Likes", price: 1, likes: 1, expiryDate: null,
  }];
  const filteredItems = [{
    ...defaultItems[0], id: 2, nftImage: "/high.jpg",
    title: "Backend Highest Likes", likes: 99,
  }];
  axios.get.mockImplementation((url) => Promise.resolve({
    data: url.includes("filter=likes_high_to_low") ? filteredItems : defaultItems,
  }));

  render(<MemoryRouter><ExploreItems /></MemoryRouter>);
  await screen.findByText("Low Likes");
  fireEvent.change(screen.getByLabelText("Sort Explore items"), {
    target: { value: "likes_high_to_low" },
  });

  await screen.findByText("Backend Highest Likes");
  await waitFor(() => expect(axios.get).toHaveBeenCalledWith(
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low",
    expect.objectContaining({ timeout: 15000 })
  ));
  expect(screen.queryByText("Low Likes")).not.toBeInTheDocument();
});

test("searches the items returned by the Explore API", async () => {
  axios.get.mockResolvedValue({
    data: [
      {
        id: 1, authorId: 1, authorImage: "/author.jpg", nftImage: "/ocean.jpg",
        title: "Pinky Ocean", price: 1, likes: 10, expiryDate: null,
      },
      {
        id: 2, authorId: 2, authorImage: "/author-2.jpg", nftImage: "/planet.jpg",
        title: "Purple Planet", price: 2, likes: 20, expiryDate: null,
      },
    ],
  });

  render(<MemoryRouter><ExploreItems /></MemoryRouter>);
  await screen.findByText("Pinky Ocean");

  fireEvent.change(screen.getByRole("searchbox", { name: "Search Explore items" }), {
    target: { value: "planet" },
  });

  expect(screen.getByText("Purple Planet")).toBeInTheDocument();
  expect(screen.queryByText("Pinky Ocean")).not.toBeInTheDocument();
  expect(axios.get).toHaveBeenCalledTimes(1);
});
