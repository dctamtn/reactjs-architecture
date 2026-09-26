import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import { App } from "./App";

test("renders the architecture shell", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { name: "Costing assistant" }),
  ).toBeInTheDocument();
});
