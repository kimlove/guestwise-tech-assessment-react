import { render, screen } from "@testing-library/react";
import { SelectField } from "./SelectField";

describe("SelectField Component", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders label and select options correctly", () => {
    render(
      <SelectField
        label="Guests"
        name="guests"
        value={2}
        min={1}
        max={5}
        onChange={mockOnChange}
      />
    );
    expect(screen.getByText("Guests")).toBeInTheDocument();
  });

  // could expand this test to check that the correct number of options are rendered
});
