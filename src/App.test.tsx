import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("When i arrive on the application", () => {
  test("Should render a field empty and button", () => {
    render(<App />);

    const buttonAdd = screen.getByRole("button", { name: /add/i });
    expect(buttonAdd).toBeInTheDocument();

    const input = screen.getByPlaceholderText(/add todo/i);
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("");
  });

  test("Should render a empty todolist", () => {
    render(<App />);

    const todos = screen.getByRole("list", {
      name: /todos/i,
    });
    expect(todos.children.length).toBe(0);
  });
});

describe("I want test todolist functionality", () => {
  test("Should adding a todo", () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/add todo/i);
    userEvent.type(input, "Buy bread");

    const buttonAdd = screen.getByRole("button", { name: /add/i });
    userEvent.click(buttonAdd);

    expect(screen.getByText(/Buy bread/i)).toBeInTheDocument();
    expect(input.value).toBe("");
  });

  test("Todo item should be crossed out after completing", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/add todo/i);
    userEvent.type(input, "Buy bread");

    const buttonAdd = screen.getByRole("button", { name: /add/i });
    userEvent.click(buttonAdd);

    const checkbox = screen.getByLabelText(/buy bread/i);
    userEvent.click(checkbox);

    expect(screen.getByText(/buy bread/i)).toHaveStyle({
      textDecoration: "line-through",
    });
    userEvent.click(checkbox);
    expect(screen.getByText(/buy bread/i)).toHaveStyle({
      textDecoration: undefined,
    });
  });
  test("Todo item should be remove", () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/add todo/i);
    userEvent.type(input, "Buy bread");

    const buttonAdd = screen.getByRole("button", { name: /add/i });
    userEvent.click(buttonAdd);

    expect(screen.getByText(/buy bread/i)).toBeInTheDocument();

    const buttonDelete = screen.getAllByRole("button", { name: /delete/i });
    userEvent.click(buttonDelete[0]);

    expect(screen.queryByText(/buy bread/i)).not.toBeInTheDocument();
  });
});
