import { render, screen } from "@testing-library/react";
import { RestaurantDetails } from "./RestaurantDetails";
import { Restaurant } from "../types/restaurants";

const mockRestaurant: Restaurant = {
  id: 1,
  name: "Velvet & Vine",
  shortDescription: "A fine dining experience with a modern twist.",
  cuisine: "French",
  rating: 4.7,
  details: {
    address: "123 Fine St, London",
    openingHours: {
      weekday: "12:00 PM - 10:00 PM",
      weekend: "11:00 AM - 11:00 PM",
    },
    contactEmail: "info@gourmetkitchen.com",
  },
};

describe("RestaurantDetails Component", () => {
  test("renders restaurant details correctly", () => {
    render(<RestaurantDetails restaurant={mockRestaurant} />);

    expect(screen.getByText("Velvet & Vine")).toBeInTheDocument();
    expect(screen.getByText("123 Fine St, London")).toBeInTheDocument();
    expect(screen.getByText("4.7")).toBeInTheDocument();
    expect(screen.getByText("French")).toBeInTheDocument();
    expect(
      screen.getByText("Weekday: 12:00 PM - 10:00 PM")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Weekend: 11:00 AM - 11:00 PM")
    ).toBeInTheDocument();
    expect(screen.getByText("info@gourmetkitchen.com")).toBeInTheDocument();
  });
});
