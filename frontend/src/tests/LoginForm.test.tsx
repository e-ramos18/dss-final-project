import { fireEvent, render } from "@testing-library/react";
import LoginForm from "../components/LoginForm";

const makeSut = () => {
  return render(<LoginForm />);
};

describe("<Button/>", () => {
  test("Should render h1 Login", () => {
    const { getByText } = makeSut();
    expect(getByText(/Login/)).toBeInTheDocument();
  });

  //   test("should call onclick successfully", () => {
  //     const spy = jest.fn();
  //     const { getByText } = makeSut({ onClick: spy });
  //     fireEvent.click(getByText(/label/));
  //     expect(spy).toHaveBeenCalled();
  //   });
});
