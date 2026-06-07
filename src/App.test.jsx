import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./pages/Home", () => ({
  __esModule: true,
  default: function MockHome() {
    const React = require("react");
    return React.createElement("main", null, "Ultraverse Market");
  },
}));

jest.mock("./pages/Explore", () => ({
  __esModule: true,
  default: function MockExplore() {
    const React = require("react");
    return React.createElement("main", null, "Explore NFTs");
  },
}));

jest.mock("./pages/Author", () => ({
  __esModule: true,
  default: function MockAuthor() {
    const React = require("react");
    return React.createElement("main", null, "Author Profile");
  },
}));

jest.mock("./pages/ItemDetails", () => ({
  __esModule: true,
  default: function MockItemDetails() {
    const React = require("react");
    return React.createElement("main", null, "Item Details");
  },
}));

test("renders the Ultraverse app shell", async () => {
  render(<App />);

  expect(screen.getByPlaceholderText(/search item here/i)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /connect wallet/i })).toBeInTheDocument();
  expect(await screen.findByText(/ultraverse market/i)).toBeInTheDocument();
});
