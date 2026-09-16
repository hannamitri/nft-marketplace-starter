import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import TopSellers from "./TopSellers";

jest.mock("axios");

test("renders all 12 sellers from the API", async () => {
  const sellers = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    authorId: 1000 + index,
    authorName: `Seller ${index + 1}`,
    authorImage: `/seller-${index + 1}.jpg`,
    price: index === 0 ? 1.2 : index + 1,
  }));
  axios.get.mockResolvedValue({ data: sellers });

  const { container } = render(
    <MemoryRouter>
      <TopSellers />
    </MemoryRouter>
  );

  expect(screen.getByRole("status", { name: "Loading top sellers" })).toBeInTheDocument();
  expect(await screen.findByText("Seller 12")).toBeInTheDocument();
  expect(container.querySelectorAll(".author_list > li")).toHaveLength(12);
  expect(screen.getByRole("img", { name: "Seller 1" })).toHaveAttribute(
    "src",
    "/seller-1.jpg"
  );
  expect(screen.getByText("1.2 ETH")).toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: "Seller 1" })[0]).toHaveAttribute(
    "href",
    "/1000/author"
  );
  expect(axios.get).toHaveBeenCalledWith(
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
    expect.objectContaining({ timeout: 15000 })
  );
});
