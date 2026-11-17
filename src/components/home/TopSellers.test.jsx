import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import TopSellers from "./TopSellers";

const renderTopSellers = () =>
  render(
    <MemoryRouter>
      <TopSellers />
    </MemoryRouter>
  );

afterEach(() => {
  jest.restoreAllMocks();
  delete global.fetch;
});

test("loads and displays seller information from the API", async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => [
      { id: 1, authorId: 83937449, authorName: "Monica Lucas", authorImage: "/monica.jpg", price: 1.2 },
      { id: 2, authorId: 73855012, authorName: "Lori Hart", authorImage: "/lori.jpg", price: 7.2 },
    ],
  });

  renderTopSellers();

  expect(screen.getByRole("status")).toHaveTextContent("Loading top sellers");
  expect(await screen.findByText("Lori Hart")).toBeInTheDocument();
  expect(screen.getByText("Monica Lucas")).toBeInTheDocument();
  expect(screen.getByText("7.2 ETH")).toBeInTheDocument();
  expect(screen.getByText("Lori Hart")).toHaveAttribute(
    "href",
    "/author/73855012"
  );
  expect(screen.getByRole("img", { name: "Lori Hart" }).closest("a")).toHaveAttribute(
    "href",
    "/author/73855012"
  );
  expect(screen.getByRole("img", { name: "Lori Hart" })).toHaveAttribute(
    "src",
    "/lori.jpg"
  );
  expect(global.fetch).toHaveBeenCalledWith(
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
    expect.objectContaining({ signal: expect.any(AbortSignal) })
  );
});

test("shows an empty state when the API returns no sellers", async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => [] });

  renderTopSellers();

  expect(await screen.findByText("No top sellers available.")).toBeInTheDocument();
});

test("shows an error when the request fails", async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 500 });
  jest.spyOn(console, "error").mockImplementation(() => {});

  renderTopSellers();

  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Top sellers could not be loaded."
  );
  expect(console.error).toHaveBeenCalled();
});

test("aborts the request when unmounted", async () => {
  global.fetch = jest.fn(() => new Promise(() => {}));
  const { unmount } = renderTopSellers();
  const { signal } = global.fetch.mock.calls[0][1];

  unmount();

  await waitFor(() => expect(signal.aborted).toBe(true));
});

test("shows seller skeletons while loading and removes them after the response", async () => {
  let resolveRequest;
  global.fetch = jest.fn(
    () => new Promise((resolve) => { resolveRequest = resolve; })
  );
  const { container } = renderTopSellers();

  expect(screen.getByRole("status")).toHaveTextContent("Loading top sellers");
  expect(container.querySelectorAll(".top-sellers__skeleton li")).toHaveLength(12);
  expect(container.querySelectorAll(".top-sellers__skeleton .skeleton-box")).toHaveLength(36);

  await act(async () => {
    resolveRequest({
      ok: true,
      json: async () => [
        { id: 1, authorName: "Monica Lucas", authorImage: "/monica.jpg", price: 1.2 },
      ],
    });
  });

  expect(screen.getByText("Monica Lucas")).toBeInTheDocument();
  expect(container.querySelector(".top-sellers__skeleton")).not.toBeInTheDocument();
  expect(screen.queryByRole("status")).not.toBeInTheDocument();
});
