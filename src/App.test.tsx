import { render, screen } from "@testing-library/react";
import App from "./App";
import { getRestaurants } from "./services/api";

jest.mock("./services/api", () => ({
  getRestaurants: jest.fn(),
}));

const mockedGetRestaurants = getRestaurants as jest.MockedFunction<
  typeof getRestaurants
>;

test("renders restaurant list with dynamic restaurant name and description", async () => {
  mockedGetRestaurants.mockResolvedValue([
    {
      id: 1,
      name: "Velvet & Vine",
      shortDescription: "A fine dining experience with a modern twist.",
    },
  ]);

  render(<App />);

  expect(mockedGetRestaurants).toHaveBeenCalled();

  const restaurantName = await screen.findByRole("heading", {
    level: 5,
    name: /Velvet & Vine/i,
  });
  const restaurantDescription = await screen.findByText(
    /A fine dining experience with a modern twist./i
  );

  expect(restaurantName).toBeInTheDocument();
  expect(restaurantDescription).toBeInTheDocument();
});
