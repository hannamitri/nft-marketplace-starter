import React from "react";
import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Countdown, { NewItemCountdown } from "../author/Countdown";

test("counts down to zero, never goes negative, and cleans up", () => {
  jest.useFakeTimers("modern");
  jest.setSystemTime(new Date("2026-01-01T00:00:00Z"));
  const clearIntervalSpy = jest.spyOn(global, "clearInterval");
  const expiresAt = Date.now() + 2000;
  const { unmount } = render(<Countdown expiresAt={expiresAt} />);
  expect(screen.getByText("00:00:02")).toBeInTheDocument();
  act(() => jest.advanceTimersByTime(1000));
  expect(screen.getByText("00:00:01")).toBeInTheDocument();
  act(() => jest.advanceTimersByTime(3000));
  expect(screen.getByText("00:00:00")).toBeInTheDocument();
  unmount();
  expect(clearIntervalSpy).toHaveBeenCalled();
  clearIntervalSpy.mockRestore();
  jest.useRealTimers();
});

test("new item countdown starts at five and a half hours and restarts on remount", () => {
  jest.useFakeTimers("modern");
  jest.setSystemTime(new Date("2026-01-01T00:00:00Z"));
  const { unmount } = render(<NewItemCountdown />);
  expect(screen.getByText("05:30:00")).toHaveClass("new-item__countdown");
  act(() => jest.advanceTimersByTime(1000));
  expect(screen.getByText("05:29:59")).toBeInTheDocument();
  unmount();
  const next = render(<NewItemCountdown />);
  expect(screen.getByText("05:30:00")).toBeInTheDocument();
  next.unmount();
  jest.useRealTimers();
});
