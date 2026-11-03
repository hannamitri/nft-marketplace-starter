import React from "react";
import { render, screen, act, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

let viewport = 1440;
window.matchMedia = (query) => ({
  get matches() {
    const min = query.match(/min-width:\s*(\d+)/);
    const max = query.match(/max-width:\s*(\d+)/);
    return (!min || viewport >= Number(min[1])) && (!max || viewport <= Number(max[1]));
  },
  media: query,
  addListener: jest.fn(),
  removeListener: jest.fn(),
});
const NewItems = require("./NewItems").default;
const NOW = 1700000000000;
const items = Array.from({ length: 7 }, (_, i) => ({
  id: i + 1, authorId: i + 10, nftId: i + 100,
  title: `Item ${i + 1}`, authorImage: "/author.jpg", nftImage: "/nft.jpg",
  price: i + 0.25, likes: i + 2,
  expiryDate: i === 0 ? NOW + 2000 : i === 2 ? NOW - 1000 : null,
}));
const show = () => render(<MemoryRouter><NewItems /></MemoryRouter>);
const respond = (data = items) => {
  global.fetch.mockResolvedValue({ ok: true, json: async () => data });
};
const settle = async () => {
  await act(async () => {});
  act(() => jest.advanceTimersByTime(0));
};
const current = (container) => container.querySelector('.slick-current:not(.slick-cloned)');
const clickArrow = (name) => {
  fireEvent.click(screen.getByRole("button", { name }));
  act(() => jest.advanceTimersByTime(0));
  act(() => jest.advanceTimersByTime(600));
  act(() => jest.advanceTimersByTime(100));
};

beforeEach(() => {
  viewport = 1440;
  jest.useFakeTimers();
  jest.setSystemTime(NOW);
  global.fetch = jest.fn();
});
afterEach(() => {
  cleanup();
  jest.clearAllTimers();
  jest.useRealTimers();
  delete global.fetch;
});

test("shows skeletons while loading and aborts the pending request on unmount", () => {
  global.fetch.mockReturnValue(new Promise(() => {}));
  const { unmount, container } = show();
  expect(screen.getByRole("status", { name: "Loading new items" })).toHaveAttribute("aria-busy", "true");
  expect(container.querySelectorAll(".new-items-skeletons .nft__item")).toHaveLength(4);
  expect(global.fetch).toHaveBeenCalledWith("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems", expect.objectContaining({ signal: expect.anything() }));
  const signal = global.fetch.mock.calls[0][1].signal;
  unmount();
  expect(signal.aborted).toBe(true);
});

test("renders API data and ticks optional timers, clamping expired countdowns to zero", async () => {
  respond();
  const { container, unmount } = show();
  await settle();
  expect(current(container)).toHaveTextContent("Item 1");
  expect(current(container)).toHaveTextContent("0.25 ETH");
  expect(current(container).querySelector("img.nft__item_preview")).toHaveAttribute("src", "/nft.jpg");
  expect(current(container).querySelector(".de_countdown")).toHaveTextContent("0h 0m 2s");
  expect(container.querySelector('.slick-slide[data-index="1"] .de_countdown')).toBeNull();
  expect(container.querySelector('.slick-slide[data-index="2"] .de_countdown')).toHaveTextContent("0h 0m 0s");
  act(() => jest.advanceTimersByTime(1000));
  expect(current(container).querySelector(".de_countdown")).toHaveTextContent("0h 0m 1s");
  act(() => jest.advanceTimersByTime(2000));
  expect(current(container).querySelector(".de_countdown")).toHaveTextContent("0h 0m 0s");
  unmount();
  expect(jest.getTimerCount()).toBe(0);
});

test.each([1440, 1024, 768, 390].map((width, i) => [width, 4 - i]))(
  "shows %i px viewport with %i cards and loops arrows in both directions", async (width, count) => {
    viewport = width;
    respond();
    const { container } = show();
    await settle();
    expect(container.querySelectorAll('.slick-active:not(.slick-cloned)')).toHaveLength(count);
    clickArrow("Previous new items");
    expect(current(container)).toHaveTextContent("Item 7");
    clickArrow("Next new items");
    expect(current(container)).toHaveTextContent("Item 1");
  }
);

test("shows empty state for an empty response", async () => {
  respond([]);
  show();
  await settle();
  expect(screen.getByRole("status")).toHaveTextContent("No new items available.");
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
});

test.each([null, [{ ...items[0], price: "invalid" }], { items }])("fails closed for invalid payload %p", async (payload) => {
  respond(payload);
  show();
  await settle();
  expect(screen.getByRole("alert")).toHaveTextContent("Unable to load new items");
  expect(screen.queryByRole("list", { name: "New items carousel" })).not.toBeInTheDocument();
});

test.each(["http", "network"])("shows error state for %s failure", async (failure) => {
  if (failure === "http") global.fetch.mockResolvedValue({ ok: false });
  else global.fetch.mockRejectedValue(new Error("Offline"));
  show();
  await settle();
  expect(screen.getByRole("alert")).toHaveTextContent("Unable to load new items");
});
