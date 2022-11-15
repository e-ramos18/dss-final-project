import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import DeleteModal from "../../components/Modals/DeleteModal";
import ErrorProvider from "../../context/ErrorProvider";
import { renderWithProviders } from "../../utils/test-utils";

let open = true;
const id = "sampleId";
const setOpen = jest.fn();

const handleDelete = jest.fn();

const renderApp = () => {
  return renderWithProviders(
    <BrowserRouter>
      <ErrorProvider>
        <DeleteModal
          open={open}
          handleClose={setOpen}
          id={id}
          handleDelete={handleDelete}
        />
      </ErrorProvider>
    </BrowserRouter>
  );
};

describe("<DeleteModal/>", () => {
  beforeEach(() => {
    renderApp();
  });
  afterEach(cleanup);

  test("should render add actor modal", () => {
    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toBeInTheDocument();
  });
  test("should render add actor modal to have buttons", () => {
    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toBeInTheDocument();
    expect(dialogElement).toHaveTextContent(
      "Are you sure you want to delete this?"
    );
    const yesBtnElement = screen.getByRole("button", {
      name: "Yes",
    });
    const cancelBtnElement = screen.getByRole("button", {
      name: "Cancel",
    });

    expect(yesBtnElement).toBeInTheDocument();
    expect(cancelBtnElement).toBeInTheDocument();
    userEvent.click(yesBtnElement);
    expect(handleDelete).toBeCalled();
  });
});
