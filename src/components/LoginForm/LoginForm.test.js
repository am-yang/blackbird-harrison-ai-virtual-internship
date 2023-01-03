import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from ".";

test("renders sign in page", () => {
  render(<LoginForm />);
  const signInText = screen.getByText("Sign in");
  expect(signInText).toBeInTheDocument();
});

// Add more unit test here

test("Error arises without adding required password field", () => {
  render(<LoginForm />);
  userEvent.click(
    screen.getByRole("button", {
      name: /sign in/i,
    })
  );
  expect(
    screen.getByText("Password should be 8 or more characters")
  ).toBeInTheDocument();
});

test("Error arises without adding required email field", () => {
  render(<LoginForm />);
  userEvent.click(
    screen.getByRole("button", {
      name: /sign in/i,
    })
  );
  expect(
    screen.getByText("Please enter valid email address")
  ).toBeInTheDocument();
});
