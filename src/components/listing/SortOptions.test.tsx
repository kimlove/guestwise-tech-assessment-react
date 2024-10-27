import { render, screen, fireEvent } from "@testing-library/react";
import SortOptions from "./SortOptions";

describe("SortOptions Component", () => {
  const mockOnSortChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("calls onSortChange with correct type when a button is clicked", () => {
    render(<SortOptions sortBy="default" onSortChange={mockOnSortChange} />);

    // Click on the "Name" button
    fireEvent.click(screen.getByText("Name"));
    expect(mockOnSortChange).toHaveBeenCalledWith("name");

    // Click on the "Rating" button
    fireEvent.click(screen.getByText("Rating"));
    expect(mockOnSortChange).toHaveBeenCalledWith("rating");
  });
});
