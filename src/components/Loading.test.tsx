import { render, screen } from "@testing-library/react";
import { Loading } from "./Loading";

describe("Loading Component", () => {
  const mockOnRetry = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("displays loading message and spinner", () => {
    render(<Loading onRetry={mockOnRetry} />);

    expect(screen.getByText("Loading booking system...")).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  // could expand this test to check that the onRetry function is called when the button is clicked
});
