import { render, screen, fireEvent } from "@testing-library/react";
import RestaurantList from "./RestaurantList";
import { Restaurant } from "../../types/restaurants";

// not ideal to harcode data in tests, but it's fine for this example
const mockRestaurants: Restaurant[] = [
  {
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
  },
  {
    id: 2,
    name: "Sushi Paradise",
    shortDescription: "Traditional sushi and modern fusion rolls.",
    cuisine: "Japanese",
    rating: 4.5,
    details: {
      address: "456 Sushi Ave, London",
      openingHours: {
        weekday: "12:00 PM - 10:00 PM",
        weekend: "11:00 AM - 11:00 PM",
      },
      contactEmail: "contact@sushiparadise.com",
    },
  },
  {
    id: 3,
    name: "Restaurant 3",
    shortDescription: "Description for Restaurant 3.",
    cuisine: "Cuisine Type",
    rating: 3.0,
    details: {
      address: "3 Address St, City",
      openingHours: {
        weekday: "12:00 PM - 10:00 PM",
        weekend: "11:00 AM - 11:00 PM",
      },
      contactEmail: "contact@restaurant3.com",
    },
  },
];

describe("RestaurantList Component", () => {
  const mockOnRestaurantSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the SearchBar and SortOptions components", () => {
    render(
      <RestaurantList
        restaurants={mockRestaurants}
        onRestaurantSelect={mockOnRestaurantSelect}
        selectedRestaurantId={null}
      />
    );

    expect(
      screen.getByPlaceholderText("Restaurant search...")
    ).toBeInTheDocument();
    expect(screen.getByText("Sort By:")).toBeInTheDocument();
  });

  test("filters restaurants based on search input", () => {
    render(
      <RestaurantList
        restaurants={mockRestaurants}
        onRestaurantSelect={mockOnRestaurantSelect}
        selectedRestaurantId={null}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Restaurant search..."), {
      target: { value: "Sushi" },
    });

    expect(screen.getByText("Sushi Paradise")).toBeInTheDocument();
    expect(screen.queryByText("Velvet & Vine")).not.toBeInTheDocument();
    expect(screen.queryByText("Restaurant 3")).not.toBeInTheDocument();
  });

  test("displays message when no restaurants match search criteria", () => {
    render(
      <RestaurantList
        restaurants={mockRestaurants}
        onRestaurantSelect={mockOnRestaurantSelect}
        selectedRestaurantId={null}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Restaurant search..."), {
      target: { value: "Steakhouse" },
    });

    expect(screen.getByText("Sorry, no restaurants found")).toBeInTheDocument();
  });
});
