import React from "react";
import { render, screen } from "@testing-library/react";
import { StyledButton } from "./StyledButton";

test("renders button with correct styles", () => {
  render(<StyledButton />);

  const button = screen.getByText(/Click me/i);
  expect(button).toHaveClass("styled-button");
});
