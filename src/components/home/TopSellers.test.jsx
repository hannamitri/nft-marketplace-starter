import React from "react";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import TopSellers from "./TopSellers";

const originalFetch = global.fetch;
const sellers = [
  { id: 1, authorId: 123, authorName: "Monica Lucas", authorImage: "https://example.com/monica.jpg", price: 1.2 },
  { id: 2, authorId: 456, authorName: "Lori Hart", authorImage: "https://example.com/lori.jpg", price: 0 },
];
const showSellers = () => render(<MemoryRouter><TopSellers /></MemoryRouter>);
const respondWith = (data) => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => data });
};
afterEach(() => { global.fetch = originalFetch; });

test("shows matching skeleton rows while loading and aborts on unmount", () => {
  global.fetch = jest.fn(() => new Promise(() => {}));
  const { container, unmount } = showSellers();
  expect(screen.getByRole("status")).toHaveTextContent("Loading top sellers");
  expect(container.querySelectorAll(".top-sellers-skeletons li")).toHaveLength(12);
  const [url, { signal }] = global.fetch.mock.calls[0];
  expect(url).toBe("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers");
  unmount();
  expect(signal.aborted).toBe(true);
});

test("renders API order, names, avatars, prices and author links", async () => {
  respondWith(sellers);
  showSellers();
  const list = await screen.findByRole("list", { name: "Top sellers" });
  const rows = within(list).getAllByRole("listitem");
  expect(rows).toHaveLength(2);
  expect(rows[0]).toHaveTextContent("Monica Lucas");
  expect(rows[0]).toHaveTextContent("1.2 ETH");
  expect(rows[1]).toHaveTextContent("Lori Hart");
  expect(rows[1]).toHaveTextContent("0 ETH");
  expect(within(rows[0]).getByRole("link", { name: "View Monica Lucas" })).toHaveAttribute("href", "/author?authorId=123");
  expect(rows[0].querySelector("img")).toHaveAttribute("src", sellers[0].authorImage);
  expect(screen.queryByText("Loading top sellers…")).not.toBeInTheDocument();
});

test("shows an empty state for an empty array", async () => {
  respondWith([]);
  showSellers();
  expect(await screen.findByText("No top sellers available.")).toBeInTheDocument();
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});

test.each([null, { sellers }, [{ ...sellers[0], price: -1 }], [{ ...sellers[0], authorName: "" }]])(
  "fails closed for malformed response %j", async (data) => {
    respondWith(data);
    showSellers();
    expect(await screen.findByRole("alert")).toHaveTextContent("Unable to load top sellers");
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  }
);

test.each(["http", "network", "json"])("shows an error for %s failure", async (failure) => {
  if (failure === "http") global.fetch = jest.fn().mockResolvedValue({ ok: false });
  if (failure === "network") global.fetch = jest.fn().mockRejectedValue(new Error("Offline"));
  if (failure === "json") global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => { throw new Error("Invalid JSON"); } });
  showSellers();
  expect(await screen.findByRole("alert")).toHaveTextContent("Unable to load top sellers");
});
