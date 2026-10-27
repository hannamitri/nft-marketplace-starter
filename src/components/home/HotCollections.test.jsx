import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HotCollections from "./HotCollections";

jest.mock("react-slick", () => ({ children }) => <div>{children}</div>);

const originalFetch = global.fetch;
const renderCollections = () => render(
  <MemoryRouter><HotCollections /></MemoryRouter>
);

afterEach(() => {
  cleanup();
  global.fetch = originalFetch;
});

test("shows loading while the request is pending", () => {
  global.fetch = jest.fn(() => new Promise(() => {}));
  const { container } = renderCollections();
  expect(container.querySelectorAll(".hot-collections-skeletons .nft_coll").length).toBe(4);
  expect(screen.queryByRole("button")).toBeNull();
  expect(screen.getByRole("status").getAttribute("aria-busy")).toBe("true");
  expect(screen.getByRole("status").textContent).toBe("Loading collections…");
});

test("shows an error when the API fails", async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: false });
  renderCollections();
  expect((await screen.findByRole("alert")).textContent).toContain("Unable to load");
});

test("handles an empty collection response", async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => [] });
  renderCollections();
  expect(await screen.findByText("No collections available.")).toBeTruthy();
});

test("renders the API title, images, and code", async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => [{ id: 1, title: "Abstraction", code: 192,
      nftImage: "https://example.com/art.jpg", authorImage: "https://example.com/author.jpg" }],
  });
  renderCollections();
  expect(await screen.findByText("Abstraction")).toBeTruthy();
  expect(screen.getByText("ERC-192")).toBeTruthy();
  expect(screen.queryByRole("status")).toBeNull();
  expect(screen.getByAltText("Abstraction").getAttribute("src")).toBe("https://example.com/art.jpg");
});
