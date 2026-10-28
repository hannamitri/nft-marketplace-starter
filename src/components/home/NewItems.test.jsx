import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NewItems from "./NewItems";
import { NEW_ITEMS_URL } from "./newItemsData";

jest.mock("react-slick", () => ({ children }) => <div>{children}</div>);
const originalFetch = global.fetch;
const records = [
  { id: 1, nftId: 11, authorId: 101, title: "First", price: 0, likes: 0,
    nftImage: "/first.jpg", authorImage: "/author-one.jpg", expiryDate: null },
  { id: 2, nftId: 22, authorId: 102, title: "Second", price: 5.07, likes: 69,
    nftImage: "/second.jpg", authorImage: "/author-two.jpg", expiryDate: 1 },
];
const renderItems = () => render(<MemoryRouter><NewItems /></MemoryRouter>);
beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => records });
});
afterEach(() => { cleanup(); global.fetch = originalFetch; });

test("shows four responsive skeleton placeholders while loading, aborts on unmount", () => {
  global.fetch.mockImplementation(() => new Promise(() => {}));
  const { container, unmount } = renderItems();
  expect(screen.getByRole("status", { name: "Loading new items" }).getAttribute("aria-busy")).toBe("true");
  expect(container.querySelectorAll(".new-items-skeletons .nft__item")).toHaveLength(4);
  expect(screen.queryByRole("button")).toBeNull();
  const signal = global.fetch.mock.calls[0][1].signal;
  unmount();
  expect(signal.aborted).toBe(true);
});

test("maps API artwork, author, price including zero, likes and matching detail links", async () => {
  renderItems();
  expect(await screen.findByText("First")).toBeTruthy();
  expect(global.fetch.mock.calls[0][0]).toBe(NEW_ITEMS_URL);
  expect(screen.getByText("0 ETH")).toBeTruthy();
  expect(screen.getByText("5.07 ETH")).toBeTruthy();
  expect(screen.getByLabelText("69 likes")).toBeTruthy();
  expect(screen.getByAltText("First").getAttribute("src")).toBe("/first.jpg");
  expect(screen.getByAltText("Author of First").getAttribute("src")).toBe("/author-one.jpg");
  screen.getAllByRole("link", { name: "Second" }).forEach((link) => {
    expect(link.getAttribute("href")).toBe("/item-details/new/22");
  });
  expect(screen.getAllByRole("timer")).toHaveLength(1);
  expect(screen.getByRole("timer").textContent).toBe("Expired");
});

test("shows empty state", async () => {
  global.fetch.mockResolvedValue({ ok: true, json: async () => [] });
  renderItems();
  expect(await screen.findByText("No new items available.")).toBeTruthy();
});

test.each([
  { ok: false },
  { ok: true, json: async () => ({ items: records }) },
  { ok: true, json: async () => [{ ...records[0], price: "5.07" }] },
  { ok: true, json: async () => [null] },
])("fails closed with an error for failed or malformed response", async (response) => {
  global.fetch.mockResolvedValue(response);
  renderItems();
  expect(await screen.findByRole("alert")).toBeTruthy();
  expect(screen.queryByText("First")).toBeNull();
});
