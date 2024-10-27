import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BookTable from "./BookTable";

// mock fetch
global.fetch = jest.fn();

describe("BookTable Component", () => {
  const mockRestaurantId = 1;
  const mockRestaurantName = "Test Restaurant";
  const mockRestaurantEmail = "contact@testrestaurant.com";

  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    });
  });

  test("makes a POST request with correct data on form submission", async () => {
    render(
      <BookTable
        restaurantId={mockRestaurantId}
        restaurantName={mockRestaurantName}
        restaurantEmail={mockRestaurantEmail}
      />
    );

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "Jane Smith" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "jane.smith@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Phone/i), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText(/Date/i), {
      target: { value: "2024-12-01" },
    });
    fireEvent.change(screen.getByLabelText(/Time/i), {
      target: { value: "18:00" },
    });
    fireEvent.change(screen.getByLabelText(/Guests/i), {
      target: { value: 2 },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /Book at Test Restaurant/i })
    );

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3001/bookings",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurantId: mockRestaurantId,
          restaurantName: mockRestaurantName,
          name: "Jane Smith",
          email: "jane.smith@example.com",
          phone: "1234567890",
          date: "2024-12-01",
          time: "18:00",
          guests: "2",
        }),
      }
    );
  });
});
