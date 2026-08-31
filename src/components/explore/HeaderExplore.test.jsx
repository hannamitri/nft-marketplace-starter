import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, it, expect } from "vitest";
import HeaderExplore from "./HeaderExplore";
import userEvent from "@testing-library/user-event";

afterEach(() => {
  cleanup();
});

describe("HeaderExplore", () => {
  it("renders the search input", () => {
    render(<HeaderExplore />);

    const searchInput = screen.getByPlaceholderText("search item here...");

    expect(searchInput).toBeTruthy();
  });

  it("lets the user type in the search input", () => {
    render(<HeaderExplore />);

    const searchInput = screen.getByPlaceholderText("search item here...");

    userEvent.type(searchInput, "test item");

    expect(searchInput.value).toBe("test item");
  });
});