import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar Component", () => {
  const mockOnSearchChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the search input field", () => {
    render(<SearchBar search="" onSearchChange={mockOnSearchChange} />);

    const input = screen.getByPlaceholderText("Restaurant search...");
    expect(input).toBeInTheDocument();
  });

  test("calls onSearchChange when typing in the input field", () => {
    render(<SearchBar search="" onSearchChange={mockOnSearchChange} />);

    const input = screen.getByPlaceholderText("Restaurant search...");
    fireEvent.change(input, { target: { value: "Sushi" } });

    expect(mockOnSearchChange).toHaveBeenCalledWith("Sushi");
  });

  test("shows clear button when search text is present and clears input on click", () => {
    render(<SearchBar search="Sushi" onSearchChange={mockOnSearchChange} />);

    const clearButton = screen.getByRole("button", { name: "×" });
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);

    expect(mockOnSearchChange).toHaveBeenCalledWith("");
  });

  test("does not show clear button when search text is empty", () => {
    render(<SearchBar search="" onSearchChange={mockOnSearchChange} />);

    const clearButton = screen.queryByRole("button", { name: "×" });
    expect(clearButton).not.toBeInTheDocument();
  });
});
