import { cleanup, screen } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";
import Movie from "../../components/Movie";
import { renderWithProviders } from "../../utils/test-utils";
import { IMovie } from "../../types";

const movie: IMovie = {
  id: "6367a35a60fb463dd5604e33",
  title: "Shazam",
  description:
    "Shazam! is a 2019 superhero film based on the DC character of the same name, produced by New Line Cinema, DC Films, and the Safran Company",
  cost: "$1 millon",
  imageUrl:
    "https://upload.wikimedia.org/wikipedia/en/c/c2/Shazam%21_%28film%29_poster.jpg",
  actorsIds: ["6367a38560fb463dd5604e34"],
  year: "2019",
};

const renderApp = () => {
  return renderWithProviders(
    <BrowserRouter>
      <Movie movie={movie} />
    </BrowserRouter>
  );
};

describe("<Movie/>", () => {
  beforeEach(() => {
    renderApp();
  });
  afterEach(cleanup);

  test("should render movie title", () => {
    const title = screen.getByText(movie.title);
    expect(title).toBeInTheDocument();
  });

  test("should render movie year", () => {
    const year = screen.getByText(movie.year);
    expect(year).toBeInTheDocument();
  });

  test("should render movie image", () => {
    renderApp();
    const imageElements = screen.getAllByText(movie.title);
    expect(imageElements[0]).toBeVisible();
  });
});
