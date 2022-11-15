import { cleanup, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import MovieModal from "../../components/Modals/MovieModal";
import ErrorProvider from "../../context/ErrorProvider";
import { renderWithProviders } from "../../utils/test-utils";

interface IForm {
  title?: string;
  description?: string;
  cost?: string;
  imageUrl?: string;
  year?: string;
}

const typeIntoAddForm = ({
  title,
  description,
  cost,
  imageUrl,
  year,
}: IForm) => {
  const titleElement = screen.getByRole("textbox", {
    name: "Title",
  });
  const descriptionElement = screen.getByRole("textbox", {
    name: "Description",
  });
  const costElement = screen.getByRole("textbox", {
    name: "Cost",
  });
  const imgElement = screen.getByRole("textbox", {
    name: "Image URL",
  });
  const yearElement = screen.getByRole("textbox", {
    name: "Year",
  });
  if (title) {
    userEvent.type(titleElement, title);
  }
  if (description) {
    userEvent.type(descriptionElement, description);
  }
  if (cost) {
    userEvent.type(costElement, cost);
  }
  if (imageUrl) {
    userEvent.type(imgElement, imageUrl);
  }
  if (year) {
    userEvent.type(yearElement, year);
  }
};

const clickSubmit = () => {
  const submitBtnElement = screen.getByRole("button", {
    name: "Submit",
  });
  userEvent.click(submitBtnElement);
};

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

  test("should show validation in TextField title", async () => {
    typeIntoAddForm({ title: "" });
    clickSubmit();
    const alertElement = await screen.findByText("Please add title.");
    await waitFor(() => {
      expect(alertElement).toBeInTheDocument();
    });
  });

  test("should show validation in TextField description", async () => {
    typeIntoAddForm({ title: "Sample", description: "" });
    clickSubmit();
    const alertElement = await screen.findByText("Please add description.");
    await waitFor(() => {
      expect(alertElement).toBeInTheDocument();
    });
  });

  test("should show validation in TextField cost", async () => {
    typeIntoAddForm({ title: "Title", description: "Description", cost: "" });
    clickSubmit();
    const alertElement = await screen.findByText("Please add cost.");
    await waitFor(() => {
      expect(alertElement).toBeInTheDocument();
    });
  });

  test("should show validation in TextField image Url", async () => {
    typeIntoAddForm({
      title: "Title",
      description: "Description",
      cost: "30",
      imageUrl: "",
    });
    clickSubmit();
    const alertElement = await screen.findByText("Please add image.");
    await waitFor(() => {
      expect(alertElement).toBeInTheDocument();
    });
  });

  test("should show validation in TextField year", async () => {
    typeIntoAddForm({
      title: "Title",
      description: "Description",
      cost: "30",
      imageUrl: "Image",
      year: "",
    });
    clickSubmit();
    const alertElement = await screen.findByText("Please add year.");
    await waitFor(() => {
      expect(alertElement).toBeInTheDocument();
    });
  });
});
