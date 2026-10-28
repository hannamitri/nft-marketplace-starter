import React from "react";
import { act, cleanup, render, screen } from "@testing-library/react";
import ItemCountdown from "./ItemCountdown";

const now = 1790000000000;
beforeEach(() => { jest.useFakeTimers(); jest.setSystemTime(now); });
afterEach(() => { cleanup(); jest.useRealTimers(); });

test("shows days and updates toward the absolute expiry", () => {
  render(<ItemCountdown expiryDate={now + 90062000} />);
  expect(screen.getByRole("timer").textContent).toBe("1d 1h 1m 2s");
  act(() => { jest.advanceTimersByTime(1000); });
  expect(screen.getByRole("timer").textContent).toBe("1d 1h 1m 1s");
});

test("recalculates after a clock jump and stops at expiry", () => {
  render(<ItemCountdown expiryDate={now + 10000} />);
  act(() => { jest.setSystemTime(now + 8000); jest.advanceTimersByTime(1000); });
  expect(screen.getByRole("timer").textContent).toBe("0h 0m 1s");
  act(() => { jest.advanceTimersByTime(1000); });
  expect(screen.getByRole("timer").textContent).toBe("Expired");
  expect(jest.getTimerCount()).toBe(0);
});

test.each([null, undefined, NaN, Infinity, "not a date", "1790000000000", 9e20])(
  "omits invalid or missing expiry %p without starting a timer", (expiryDate) => {
    render(<ItemCountdown expiryDate={expiryDate} />);
    expect(screen.queryByRole("timer")).toBeNull();
    expect(jest.getTimerCount()).toBe(0);
  }
);

test("expired dates clamp and unmount clears a running timer", () => {
  const { rerender, unmount } = render(<ItemCountdown expiryDate={now - 1} />);
  expect(screen.getByRole("timer").textContent).toBe("Expired");
  expect(jest.getTimerCount()).toBe(0);
  rerender(<ItemCountdown expiryDate={now + 10000} />);
  expect(jest.getTimerCount()).toBe(1);
  unmount();
  expect(jest.getTimerCount()).toBe(0);
});
