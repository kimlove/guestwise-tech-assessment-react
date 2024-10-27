import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RestaurantItem from "./RestaurantItem";
import { Restaurant } from "../../types/restaurants";

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

describe("RestaurantItem Component", () => {
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("displays restaurant name, description, and rating", () => {
    render(
      <RestaurantItem
        restaurant={mockRestaurant}
        isSelected={false}
        onSelect={mockOnSelect}
      />
    );

    expect(screen.getByText("Velvet & Vine")).toBeInTheDocument();
    expect(
      screen.getByText("A fine dining experience with a modern twist.")
    ).toBeInTheDocument();
    expect(screen.getByText("4.7")).toBeInTheDocument();
  });

  test("calls onSelect when clicked", () => {
    render(
      <RestaurantItem
        restaurant={mockRestaurant}
        isSelected={false}
        onSelect={mockOnSelect}
      />
    );

    fireEvent.click(screen.getByRole("button"));

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });
});
