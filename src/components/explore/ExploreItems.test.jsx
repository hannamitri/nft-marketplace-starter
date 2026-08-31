import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import ExploreItems from "./ExploreItems";

vi.mock("axios");

afterEach(() => {
  cleanup();
});

describe("ExploreItems", () => {
  it("requests low-to-high pricing when the user selects that filter", async () => {
    axios.get.mockResolvedValue({
      data: [],
    });

    render(
        <MemoryRouter>
            <ExploreItems />
        </MemoryRouter>
    )
    const filterSelect = screen.getByRole("combobox");

    userEvent.selectOptions(filterSelect, "price_low_to_high");

    await waitFor(() => {
  expect(axios.get).toHaveBeenCalledWith(
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_low_to_high"
  );
});
});

it("shows more items when the user clicks Load more", async () => {
  const mockItems = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    nftId: index + 1,
    title: `NFT ${index + 1}`,
  }));
  axios.get.mockResolvedValue({
  data: mockItems,
});
render(
  <MemoryRouter>
    <ExploreItems />
  </MemoryRouter>
);
await screen.findByText("NFT 1");
expect(screen.queryByText("NFT 9")).toBeNull();

const loadMoreButton = screen.getByRole("button", {
  name: /load more/i,
});
userEvent.click(loadMoreButton);

await screen.findByText("NFT 9");

  });

});