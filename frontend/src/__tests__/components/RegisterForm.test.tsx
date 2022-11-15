import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, Router } from "react-router-dom";
import { renderWithProviders } from "../../utils/test-utils";
import { createMemoryHistory } from "history";
import { RegisterForm } from "../../components";

describe("<RegisterForm/>", () => {
  const renderApp = () => {
    return renderWithProviders(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    );
  };
  afterEach(cleanup);

  test("should render <h1>Register</h1>", () => {
    renderApp();
    const getH1Element = screen.getByRole("heading", { name: "Register" });
    expect(getH1Element).toBeInTheDocument();
  });

  test("should render TextField Name", () => {
    renderApp();
    const nameInputElement = screen.getByRole("textbox", { name: "Name" });
    expect(nameInputElement).toBeInTheDocument();
  });

  test("should render TextField Email", () => {
    renderApp();
    const emailInputElement = screen.getByRole("textbox", { name: "Email" });
    expect(emailInputElement).toBeInTheDocument();
  });

  test("should render TextField Password", () => {
    renderApp();
    const passwordInputElement = screen.getByTestId("pass");
    expect(passwordInputElement).toBeInTheDocument();
  });

  test("should render TextField Confirm Password", () => {
    renderApp();
    const passwordInputElement = screen.getByTestId("cpass");
    expect(passwordInputElement).toBeInTheDocument();
  });

  test("should render Button Register", () => {
    renderApp();
    const registerBtnElement = screen.getByRole("button", { name: "Register" });
    expect(registerBtnElement).toBeInTheDocument();
  });

  test("should render text", () => {
    renderApp();
    const text = screen.getByText("Already have an account?");
    expect(text).toBeInTheDocument();
  });

  test("should render Button Sign in", () => {
    renderApp();
    const signinBtnElement = screen.getByRole("button", { name: "Sign in" });
    expect(signinBtnElement).toBeInTheDocument();
  });

  test("should navigate to login page when Button Sign in is clicked", () => {
    const history = createMemoryHistory();
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <RegisterForm />
      </Router>
    );
    const signinBtnElement = screen.getByRole("button", { name: "Sign in" });
    userEvent.click(signinBtnElement);

    expect(history.location.pathname).toEqual("/login");
  });
});
