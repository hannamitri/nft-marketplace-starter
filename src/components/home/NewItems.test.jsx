import React from "react";
import { act, render, screen } from "@testing-library/react";
import axios from "axios";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import NewItems from "./NewItems";

jest.mock("axios");

test("renders API items and updates only their real expiry countdowns", async () => {
  jest.useFakeTimers();
  jest.spyOn(Date, "now").mockReturnValue(1000000);
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));

  const items = Array.from({ length: 7 }, (_, index) => ({
    id: index + 1,
    title: `Item ${index + 1}`,
    nftImage: `/item-${index + 1}.jpg`,
    authorImage: "/creator.jpg",
    price: index === 0 ? 5.07 : 1,
    likes: index === 0 ? 69 : 1,
    expiryDate: index === 0 ? 1005000 : null,
  }));
  axios.get.mockResolvedValue({ data: items });

  try {
    const { container } = render(<MemoryRouter><NewItems /></MemoryRouter>);
    await screen.findByText("Item 7");

    expect(container.querySelectorAll(".new-item-card")).toHaveLength(7);
    expect(container.querySelectorAll(".keen-slider__slide")).toHaveLength(7);
    expect(screen.getByRole("button", { name: "Next new item" })).toBeInTheDocument();
    expect(screen.getByText("1 / 7")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Item 1" })[0]).toHaveAttribute("href", "/item-details/1");
    expect(screen.getByText("5.07 ETH")).toBeInTheDocument();
    expect(screen.getByText("69")).toBeInTheDocument();
    expect(container.querySelectorAll(".de_countdown")).toHaveLength(1);
    expect(screen.getByText("0h 0m 5s")).toBeInTheDocument();

    Date.now.mockReturnValue(1003000);
    act(() => jest.advanceTimersByTime(3000));
    expect(screen.getByText("0h 0m 2s")).toBeInTheDocument();
  } finally {
    Date.now.mockRestore();
    jest.useRealTimers();
  }
});
