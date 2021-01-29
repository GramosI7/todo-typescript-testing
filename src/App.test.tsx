import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

describe("Renders default screen", () => {
  test("Should display input and button", () => {
    render(<App />);

    const buttonAdd = screen.getByRole("button", { name: /add/i });
    expect(buttonAdd).toBeInTheDocument();

    const input = screen.getByPlaceholderText(/add todo/i);
    expect(input).toBeInTheDocument();
  });

  test("Should display a empty todolist", () => {
    render(<App />);

    const todos = screen.getByTestId("todos");
    expect(todos.children.length).toBe(0);
  });

  test("Add a todo", () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/add todo/i);
    fireEvent.change(input, {
      target: { value: "Buy bread" },
    });

    const buttonAdd = screen.getByRole("button", { name: /add/i });
    fireEvent.click(buttonAdd);
    expect(screen.getByText(/Buy bread/i)).toBeInTheDocument();
  });

  test("Check & uncheck a todo", () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/add todo/i);
    fireEvent.change(input, {
      target: { value: /buy bread/i },
    });

    const buttonAdd = screen.getByRole("button", { name: /add/i });
    fireEvent.click(buttonAdd);

    const checkbox = screen.getByLabelText(/buy bread/i);
    fireEvent.click(checkbox);
    expect(screen.getByText(/buy bread/i)).toHaveStyle({
      textDecoration: "line-through",
    });
    fireEvent.click(checkbox);
    expect(screen.getByText(/buy bread/i)).toHaveStyle({
      textDecoration: undefined,
    });
  });
});
