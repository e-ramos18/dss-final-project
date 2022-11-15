import { cleanup, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AddReviewModal from "../../components/Modals/AddReviewModal";
import ErrorProvider from "../../context/ErrorProvider";
import { renderWithProviders } from "../../utils/test-utils";

let open = true;
const setOpen = (value: boolean) => {
  open = value;
};

let message = "";
const setInfoMessage = (msg: string) => {
  message = msg;
};

const renderApp = () => {
  return renderWithProviders(
    <BrowserRouter>
      <ErrorProvider>
        <AddReviewModal
          open={open}
          handleClose={() => setOpen(false)}
          setInfoMessage={setInfoMessage}
        />
      </ErrorProvider>
    </BrowserRouter>
  );
};

describe("<AddReviewModal/>", () => {
  beforeEach(() => {
    renderApp();
  });
  afterEach(cleanup);

  test("should render Add Review", () => {
    const addReviewElement = screen.getByText("Add Review");
    expect(addReviewElement).toBeInTheDocument();
  });

  test("should render TextField Description", () => {
    const descInputElement = screen.getByRole("textbox", {
      name: "Description",
    });
    expect(descInputElement).toBeInTheDocument();
  });

  test("should render Btn Submit", () => {
    const btnSubmitElement = screen.getByRole("button", {
      name: "Submit",
    });
    expect(btnSubmitElement).toBeInTheDocument();
  });
});
