import { cleanup, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MovieModal from "../../components/Modals/MovieModal";
import ErrorProvider from "../../context/ErrorProvider";
import { renderWithProviders } from "../../utils/test-utils";

let open = true;
const setOpen = (value: boolean) => {
  open = false;
};

const renderApp = () => {
  return renderWithProviders(
    <BrowserRouter>
      <ErrorProvider>
        <MovieModal
          open={open}
          handleClose={() => setOpen(false)}
          setOpenAddActor={(value: boolean) => setOpen(value)}
        />
      </ErrorProvider>
    </BrowserRouter>
  );
};

describe("<MovieModal/>", () => {
  beforeEach(() => {
    renderApp();
  });
  afterEach(cleanup);

  test("should render add movie modal", () => {
    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toBeInTheDocument();
  });

  test("should render TextField Title", () => {
    const titleInputElement = screen.getByRole("textbox", { name: "Title" });
    expect(titleInputElement).toBeInTheDocument();
  });

  test("should render TextField Description", () => {
    const descInputElement = screen.getByRole("textbox", {
      name: "Description",
    });
    expect(descInputElement).toBeInTheDocument();
  });

  test("should render TextField Cost", () => {
    const costInputElement = screen.getByRole("textbox", {
      name: "Cost",
    });
    expect(costInputElement).toBeInTheDocument();
  });

  test("should render TextField Image URL", () => {
    const imgInputElement = screen.getByRole("textbox", {
      name: "Image URL",
    });
    expect(imgInputElement).toBeInTheDocument();
  });

  test("should render TextField Year", () => {
    const yearInputElement = screen.getByRole("textbox", {
      name: "Year",
    });
    expect(yearInputElement).toBeInTheDocument();
  });

  test("should render Btn Add actor", () => {
    const btnAddElement = screen.getByRole("button", {
      name: "Add Actor",
    });
    expect(btnAddElement).toBeInTheDocument();
  });

  test("should render Btn Submit", () => {
    const btnSubmitElement = screen.getByRole("button", {
      name: "Submit",
    });
    expect(btnSubmitElement).toBeInTheDocument();
  });
});
