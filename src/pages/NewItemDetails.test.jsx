import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Link, MemoryRouter, Route, Routes } from "react-router-dom";
import NewItemDetails from "./NewItemDetails";

const originalFetch = global.fetch;
const records = [
  { nftId: 11, authorId: 101, title: "First", price: 0, likes: 0,
    nftImage: "/first.jpg", authorImage: "/author-one.jpg", expiryDate: null },
  { nftId: 22, authorId: 102, title: "Second", price: 5.07, likes: 69,
    nftImage: "/second.jpg", authorImage: "/author-two.jpg", expiryDate: 1 },
];
const renderPage = (id = "22") => render(
  <MemoryRouter initialEntries={[`/item-details/new/${id}`]}>
    <Link to="/item-details/new/11">Select first</Link>
    <Routes><Route path="/item-details/new/:nftId" element={<NewItemDetails />} /></Routes>
  </MemoryRouter>
);
beforeEach(() => {
  window.scrollTo = jest.fn();
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => records });
});
afterEach(() => { cleanup(); global.fetch = originalFetch; });

test("direct detail visits load only the selected item and its provided fields", async () => {
  renderPage();
  expect(screen.getByRole("status", { name: "Loading new item" })).toBeTruthy();
  expect(await screen.findByRole("heading", { name: "Second" })).toBeTruthy();
  expect(screen.getByText("5.07 ETH")).toBeTruthy();
  expect(screen.getByText("69 likes")).toBeTruthy();
  expect(screen.getByAltText("Second").getAttribute("src")).toBe("/second.jpg");
  expect(screen.getByAltText("Author of Second").getAttribute("src")).toBe("/author-two.jpg");
  expect(screen.getByRole("timer").textContent).toBe("Expired");
  expect(screen.queryByText("First")).toBeNull();
});

test("navigation to another ID refetches matching zero values and omits absent expiry", async () => {
  renderPage();
  await screen.findByRole("heading", { name: "Second" });
  fireEvent.click(screen.getByRole("link", { name: "Select first" }));
  expect(await screen.findByRole("heading", { name: "First" })).toBeTruthy();
  expect(screen.getByText("0 ETH")).toBeTruthy();
  expect(screen.getByText("0 likes")).toBeTruthy();
  expect(screen.queryByRole("timer")).toBeNull();
  expect(screen.queryByText("Second")).toBeNull();
  expect(global.fetch).toHaveBeenCalledTimes(2);
});

test("unknown ID shows missing state without substituting a record", async () => {
  renderPage("99");
  expect(await screen.findByText("Item not found.")).toBeTruthy();
  expect(screen.queryByText("First")).toBeNull();
});

test("invalid ID is rejected before fetching", () => {
  renderPage("invalid");
  expect(screen.getByText("Item not found.")).toBeTruthy();
  expect(global.fetch).not.toHaveBeenCalled();
});

test("request failure shows error", async () => {
  global.fetch.mockRejectedValue(new Error("Offline"));
  renderPage();
  expect(await screen.findByRole("alert")).toBeTruthy();
});

test("unmount aborts a pending request", () => {
  global.fetch.mockImplementation(() => new Promise(() => {}));
  const { unmount } = renderPage();
  const signal = global.fetch.mock.calls[0][1].signal;
  unmount();
  expect(signal.aborted).toBe(true);
});
