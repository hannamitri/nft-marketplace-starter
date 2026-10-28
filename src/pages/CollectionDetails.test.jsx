import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CollectionDetails from "./CollectionDetails";

const originalFetch = global.fetch;
const records = [
  { nftId: 11, title: "First", code: 192, nftImage: "/first.jpg", authorImage: "/author-one.jpg" },
  { nftId: 22, title: "Second", code: 661, nftImage: "/second.jpg", authorImage: "/author-two.jpg" },
];
const renderPage = (id = "22") => render(
  <MemoryRouter initialEntries={[`/item-details/${id}`]}>
    <Routes><Route path="/item-details/:nftId" element={<CollectionDetails />} /></Routes>
  </MemoryRouter>
);

beforeEach(() => {
  window.scrollTo = jest.fn();
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => records });
});
afterEach(() => { cleanup(); global.fetch = originalFetch; });

test("loads the record selected by the URL, including on a direct visit", async () => {
  renderPage();
  expect(screen.getByRole("status", { name: "Loading collection" })).toBeTruthy();
  expect(await screen.findByRole("heading", { name: "Second" })).toBeTruthy();
  expect(screen.getByAltText("Second").getAttribute("src")).toBe("/second.jpg");
  expect(screen.getByAltText("Author of Second").getAttribute("src")).toBe("/author-two.jpg");
  expect(screen.getByText("ERC-661")).toBeTruthy();
  expect(screen.queryByText("First")).toBeNull();
});

test("does not substitute another card for an unknown ID", async () => {
  renderPage("99");
  expect(await screen.findByText("Collection not found.")).toBeTruthy();
  expect(screen.queryByText("First")).toBeNull();
});

test("rejects invalid IDs before making a request", async () => {
  renderPage("invalid");
  expect(await screen.findByText("Collection not found.")).toBeTruthy();
  expect(global.fetch).not.toHaveBeenCalled();
});

test("shows a request failure without displaying placeholder details", async () => {
  global.fetch.mockResolvedValue({ ok: false });
  renderPage();
  expect(await screen.findByRole("alert")).toBeTruthy();
  expect(screen.queryByText("First")).toBeNull();
});
