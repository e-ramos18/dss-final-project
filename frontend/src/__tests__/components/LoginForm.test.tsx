import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, Router } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import { renderWithProviders } from "../../utils/test-utils";
import { createMemoryHistory } from "history";

describe("<LoginForm/>", () => {
  const renderApp = () => {
    return renderWithProviders(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
  };
  afterEach(cleanup);

  test("should render <h1>Login</h1>", () => {
    renderApp();
    const getH1Element = screen.getByRole("heading", { name: "Login" });
    expect(getH1Element).toBeInTheDocument();
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

  test("should render Button Login", () => {
    renderApp();
    const loginBtnElement = screen.getByRole("button", { name: "Login" });
    expect(loginBtnElement).toBeInTheDocument();
  });

  test("should render text", () => {
    renderApp();
    const text = screen.getByText("Doesn't an account?");
    expect(text).toBeInTheDocument();
  });

  test("should render Button Sign up", () => {
    renderApp();
    const signupBtnElement = screen.getByRole("button", { name: "Sign up" });
    expect(signupBtnElement).toBeInTheDocument();
  });

  test("should navigate to register page when Button Sign up is clicked", () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <LoginForm />
      </Router>
    );
    const signupBtnElement = screen.getByRole("button", { name: "Sign up" });
    userEvent.click(signupBtnElement);

    expect(history.location.pathname).toEqual("/register");
  });
});
