import SearchInput, { Iprops } from "../../components/SearchInput";
import { render } from "@testing-library/react";

const makeSut = (props: Partial<Iprops>) => {
  return render(
    <SearchInput
      value="Sample Search"
      reset={jest.fn()}
      onChange={jest.fn()}
      onSearch={jest.fn()}
      {...props}
    />
  );
};

describe("<SearchInput/>", () => {
  test("Should have placeholder 'My placeholder'", () => {
    const { getAllByPlaceholderText } = makeSut({
      placeHolder: "My placeholder",
    });
    expect(getAllByPlaceholderText(/My placeholder/)).toHaveLength(1);
  });
  test("Should have value 'My placeholder'", () => {
    const { getByDisplayValue } = makeSut({
      placeHolder: "My placeholder",
    });
    expect(getByDisplayValue(/Sample Search/)).toBeInTheDocument();
  });
});
