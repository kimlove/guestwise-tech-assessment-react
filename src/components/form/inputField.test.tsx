import { render, screen } from "@testing-library/react";
import { InputField } from "./inputField";

jest.spyOn(console, "error").mockImplementation((message) => {
  if (message.includes("ReactDOMTestUtils.act is deprecated")) {
    return;
  }
  console.error(message);
});

describe("InputField Component", () => {
  const defaultProps = {
    label: "Test Label",
    name: "testName",
    type: "text",
    required: true,
    value: "Initial Value",
    onChange: jest.fn(),
  };

  test("renders label and input correctly", () => {
    render(<InputField {...defaultProps} />);

    const label = screen.getByLabelText("Test Label");
    expect(label).toBeInTheDocument();

    const input = screen.getByRole("textbox", { name: /test label/i });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("name", "testName");
    expect(input).toHaveAttribute("type", "text");
  });

  test("renders with required attribute when required is true", () => {
    render(<InputField {...defaultProps} />);

    const input = screen.getByRole("textbox", { name: /test label/i });
    expect(input).toBeRequired();
  });

  test("does not render with required attribute when required is false", () => {
    render(<InputField {...defaultProps} required={false} />);

    const input = screen.getByRole("textbox", { name: /test label/i });
    expect(input).not.toBeRequired();
  });

  test("displays the correct value", () => {
    render(<InputField {...defaultProps} value="Test Value" />);

    const input = screen.getByRole("textbox", { name: /test label/i });
    expect(input).toHaveValue("Test Value");
  });
});
