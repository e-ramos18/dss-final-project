import { cleanup, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import ActorModal from "../../components/Modals/ActorModal";
import ErrorProvider from "../../context/ErrorProvider";
import { renderWithProviders } from "../../utils/test-utils";

let open = true;
const setOpen = jest.fn();

interface IForm {
  fName?: string;
  lName?: string;
  age?: string;
  about?: string;
  imageUrl?: string;
}

const typeIntoAddForm = ({ fName, lName, age, about, imageUrl }: IForm) => {
  const fnameElement = screen.getByRole("textbox", {
    name: "First name",
  });
  const lnameElement = screen.getByRole("textbox", {
    name: "Last name",
  });
  const ageElement = screen.getByRole("textbox", {
    name: "Age",
  });
  const aboutElement = screen.getByRole("textbox", {
    name: "About",
  });
  const imgUrlElement = screen.getByRole("textbox", {
    name: "Image URL",
  });

  if (fName) {
    userEvent.type(fnameElement, fName);
  }
  if (lName) {
    userEvent.type(lnameElement, lName);
  }
  if (age) {
    userEvent.type(ageElement, age);
  }
  if (about) {
    userEvent.type(aboutElement, about);
  }
  if (imageUrl) {
    userEvent.type(imgUrlElement, imageUrl);
  }
};

const clickSubmit = () => {
  const submitBtnElement = screen.getByRole("button", {
    name: "Submit",
  });
  userEvent.click(submitBtnElement);
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
    expect(dialogElement).toHaveTextContent("Add Actor");
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
    typeIntoAddForm({ fName: "" });
    clickSubmit();
    const alertElement = await screen.findByText("Please add first name.");
    await waitFor(() => {
      expect(alertElement).toBeInTheDocument();
    });
  });

  test("should show validation in TextField last name", async () => {
    typeIntoAddForm({ fName: "John", lName: "" });
    clickSubmit();
    const alertElement = await screen.findByText("Please add last name.");
    await waitFor(() => {
      expect(alertElement).toBeInTheDocument();
    });
  });

  test("should show validation in TextField Age", async () => {
    typeIntoAddForm({ fName: "John", lName: "Doe", age: "" });
    clickSubmit();
    const alertElement = await screen.findByText("Please add age.");
    await waitFor(() => {
      expect(alertElement).toBeInTheDocument();
    });
  });

  test("should show validation in TextField About", async () => {
    typeIntoAddForm({ fName: "John", lName: "Doe", age: "28", about: "" });
    clickSubmit();
    const alertElement = await screen.findByText("Please add about.");
    await waitFor(() => {
      expect(alertElement).toBeInTheDocument();
    });
  });

  test("should show validation in TextField Image URL", async () => {
    typeIntoAddForm({
      fName: "John",
      lName: "Doe",
      age: "28",
      about: "This is john",
      imageUrl: "",
    });
    clickSubmit();
    const alertElement = await screen.findByText("Please add image.");
    await waitFor(() => {
      expect(alertElement).toBeInTheDocument();
    });
  });
});
