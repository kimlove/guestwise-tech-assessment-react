import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders restaurant list with dynamic restaurant name and description", async () => {
  render(<App />);

  // Wait for the restaurant list to load before checking the restaurant name and description
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
