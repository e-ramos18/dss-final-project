import { cleanup, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import ActorModal from "../../components/Modals/ActorModal";
import ErrorProvider from "../../context/ErrorProvider";
import { renderWithProviders } from "../../utils/test-utils";

let open = true;
const setOpen = () => {
  open = false;
};

const renderApp = () => {
  return renderWithProviders(
    <BrowserRouter>
      <ErrorProvider>
        <ActorModal open={open} handleClose={setOpen} />
      </ErrorProvider>
    </BrowserRouter>
  );
};

describe("<ActorModal/>", () => {
  beforeEach(() => {
    renderApp();
  });
  afterEach(cleanup);

  test("should render add actor modal", () => {
    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toBeInTheDocument();
  });

  test("should render TextField first name", () => {
    const fnameInputElement = screen.getByRole("textbox", {
      name: "First name",
    });
    expect(fnameInputElement).toBeInTheDocument();
  });

  test("should render TextField last name", () => {
    const lnameInputElement = screen.getByRole("textbox", {
      name: "Last name",
    });
    expect(lnameInputElement).toBeInTheDocument();
  });

  test("should render TextField age", () => {
    const ageInputElement = screen.getByRole("textbox", {
      name: "Age",
    });
    expect(ageInputElement).toBeInTheDocument();
  });
  test("should render TextField about", () => {
    const aboutInputElement = screen.getByRole("textbox", {
      name: "About",
    });
    expect(aboutInputElement).toBeInTheDocument();
  });
  test("should render TextField image", () => {
    const imgInputElement = screen.getByRole("textbox", {
      name: "Image URL",
    });
    expect(imgInputElement).toBeInTheDocument();
  });
  test("should render button submit", () => {
    const submitBtnElement = screen.getByRole("button", {
      name: "Submit",
    });
    expect(submitBtnElement).toBeInTheDocument();
  });

  test("should show validation in TextField first name", async () => {
    const fnameInputElement = screen.getByRole("textbox", {
      name: "First name",
    });
    expect(fnameInputElement).toBeInTheDocument();
    userEvent.type(fnameInputElement, "");
    const submitBtnElement = screen.getByRole("button", {
      name: "Submit",
    });
    userEvent.click(submitBtnElement);
    const alertElement = await screen.findByText("Please add first name.");
    await waitFor(() => {
      expect(alertElement).toBeInTheDocument();
    });
  });
});
