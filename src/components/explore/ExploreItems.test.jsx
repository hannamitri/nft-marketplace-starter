import React from "react";
import { render, screen, fireEvent, act, cleanup, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import ExploreItems from "./ExploreItems";

const URL = "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
const NOW = 1700000000000;
const items = Array.from({ length: 16 }, (_, index) => ({
  id: index + 1, authorId: index + 10, nftId: index + 100,
  title: `Explore ${index + 1}`, authorImage: "/author.jpg", nftImage: "/nft.jpg",
  price: index + 0.25, likes: index + 2,
  expiryDate: index === 0 ? NOW + 2000 : index === 2 ? NOW - 1000 : null,
}));
const response = (data = items) => ({ ok: true, json: async () => data });
const show = () => render(<MemoryRouter><ExploreItems /></MemoryRouter>);
const settle = async () => act(async () => {});
const cards = () => within(screen.getByRole("list", { name: "Explore items" })).getAllByRole("listitem");
const sort = (value) => fireEvent.change(screen.getByLabelText("Sort items"), { target: { value } });

beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(NOW);
  global.fetch = jest.fn().mockResolvedValue(response());
});
afterEach(() => {
  cleanup();
  jest.clearAllTimers();
  jest.useRealTimers();
  delete global.fetch;
});

test("shows 8 skeletons while loading and aborts on unmount", () => {
  global.fetch.mockReturnValue(new Promise(() => {}));
  const { container, unmount } = show();
  expect(screen.getByRole("status", { name: "Loading explore items" })).toHaveAttribute("aria-busy", "true");
  expect(container.querySelectorAll(".nft__item")).toHaveLength(8);
  const signal = global.fetch.mock.calls[0][1].signal;
  unmount();
  expect(signal.aborted).toBe(true);
});

test("retains previous cards as Load more expands 8 to 12 to 16 and then disappears", async () => {
  show();
  await settle();
  expect(global.fetch).toHaveBeenCalledWith(URL, expect.objectContaining({ signal: expect.anything() }));
  expect(cards()).toHaveLength(8);
  const firstCard = cards()[0];
  expect(firstCard).toHaveTextContent("Explore 1");
  expect(firstCard).toHaveTextContent("0.25 ETH");
  expect(within(firstCard).getByRole("link", { name: "View creator of Explore 1" })).toHaveAttribute("href", "/author?authorId=10");
  expect(within(firstCard).getByRole("img", { name: "Explore 1" })).toHaveAttribute("src", "/nft.jpg");
  fireEvent.click(screen.getByRole("button", { name: "Load more" }));
  expect(cards()).toHaveLength(12);
  expect(cards()[0]).toBe(firstCard);
  fireEvent.click(screen.getByRole("button", { name: "Load more" }));
  expect(cards()).toHaveLength(16);
  expect(cards()[15]).toHaveTextContent("Explore 16");
  expect(screen.queryByRole("button", { name: "Load more" })).not.toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledTimes(1);
});

test.each(["price_low_to_high", "price_high_to_low", "likes_high_to_low"])("requests %s and renders server order, resets pagination and restores Default", async (value) => {
  show();
  await settle();
  fireEvent.click(screen.getByRole("button", { name: "Load more" }));
  fireEvent.click(screen.getByRole("button", { name: "Load more" }));
  global.fetch.mockResolvedValueOnce(response([...items].reverse()));
  sort(value);
  expect(screen.getByRole("status", { name: "Loading explore items" })).toBeInTheDocument();
  await settle();
  expect(global.fetch).toHaveBeenLastCalledWith(`${URL}?filter=${value}`, expect.objectContaining({ signal: expect.anything() }));
  expect(cards()).toHaveLength(8);
  expect(cards()[0]).toHaveTextContent("Explore 16");
  sort("");
  await settle();
  expect(global.fetch).toHaveBeenLastCalledWith(URL, expect.objectContaining({ signal: expect.anything() }));
  expect(cards()[0]).toHaveTextContent("Explore 1");
});

test("ignores a late aborted response after rapid filter changes", async () => {
  let finishOld;
  global.fetch.mockReturnValueOnce(new Promise((resolve) => { finishOld = resolve; }));
  show();
  const oldSignal = global.fetch.mock.calls[0][1].signal;
  sort("likes_high_to_low");
  await settle();
  expect(oldSignal.aborted).toBe(true);
  expect(cards()[0]).toHaveTextContent("Explore 1");
  await act(async () => finishOld(response([...items].reverse())));
  expect(cards()[0]).toHaveTextContent("Explore 1");
  expect(screen.getByLabelText("Sort items")).toHaveValue("likes_high_to_low");
});

test("shared countdown is optional, ticks, clamps at zero, and clears its section clock", async () => {
  const { unmount } = show();
  await settle();
  expect(cards()[0].querySelector(".de_countdown")).toHaveTextContent("0h 0m 2s");
  expect(cards()[1].querySelector(".de_countdown")).toBeNull();
  expect(cards()[2].querySelector(".de_countdown")).toHaveTextContent("0h 0m 0s");
  expect(jest.getTimerCount()).toBe(1);
  act(() => jest.advanceTimersByTime(1000));
  expect(cards()[0].querySelector(".de_countdown")).toHaveTextContent("0h 0m 1s");
  act(() => jest.advanceTimersByTime(1000));
  expect(cards()[0].querySelector(".de_countdown")).toHaveTextContent("0h 0m 0s");
  expect(jest.getTimerCount()).toBe(0);
  unmount();
  expect(jest.getTimerCount()).toBe(0);
});

test("shows empty state without Load more", async () => {
  global.fetch.mockResolvedValue(response([]));
  show();
  await settle();
  expect(screen.getByRole("status")).toHaveTextContent("No explore items available.");
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
});

test.each(["http", "network", "invalid"])("shows error without cards for %s failure", async (failure) => {
  if (failure === "http") global.fetch.mockResolvedValue({ ok: false });
  else if (failure === "network") global.fetch.mockRejectedValue(new Error("Offline"));
  else global.fetch.mockResolvedValue(response([{ ...items[0], price: "invalid" }]));
  show();
  await settle();
  expect(screen.getByRole("alert")).toHaveTextContent("Unable to load explore items.");
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});
