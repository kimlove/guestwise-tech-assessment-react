import React, { useState } from "react";
import { Restaurant } from "../types/restaurants";

import {
  ListGroup,
  Container,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";

type RestaurantListProps = {
  restaurants: Restaurant[];
  onRestaurantSelect: (id: number) => void;
  selectedRestaurantId: number | null;
};

const RestaurantList: React.FC<RestaurantListProps> = ({
  restaurants,
  onRestaurantSelect,
  selectedRestaurantId,
}) => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "name" | "rating">(
    "default"
  );

  const searchQueryHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const resetSearchHandler = () => {
    setSearch("");
  };

  const sortHandler = (sortType: "default" | "name" | "rating") => {
    setSortBy(sortType);
  };

  // search restaurants based on the search input and check name and shortDescription
  const filteredRestaurants = restaurants.filter((restaurant) =>
    `${restaurant.name} ${restaurant.shortDescription}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Sort restaurants based on the selected sort option
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    return 0; // "default" keeps the original order
  });

  return (
    <Container>
      <h2>Restaurants</h2>

      <InputGroup className="mb-1">
        <FormControl
          type="text"
          placeholder="Search..."
          value={search}
          onChange={searchQueryHandler}
        />
        {search && (
          <Button variant="outline-secondary" onClick={resetSearchHandler}>
            ×
          </Button>
        )}
      </InputGroup>

      <div className="d-flex align-items-center gap-1 mb-2">
        Sort By:
        <Button
          variant="link"
          onClick={() => sortHandler("default")}
          active={sortBy === "default"}
        >
          Default
        </Button>
        <Button
          variant="link"
          onClick={() => sortHandler("name")}
          active={sortBy === "name"}
        >
          Name
        </Button>
        <Button
          variant="link"
          onClick={() => sortHandler("rating")}
          active={sortBy === "rating"}
        >
          Rating
        </Button>
      </div>

      {sortedRestaurants.length === 0 ? (
        <div className="text-center">
          <p>Sorry, no restaurants found</p>
          <div>
            <Button variant="primary" onClick={resetSearchHandler}>
              Reset search
            </Button>
          </div>
        </div>
      ) : (
        <ListGroup>
          {sortedRestaurants.map((restaurant) => (
            <ListGroup.Item
              key={restaurant.id}
              action
              onClick={() => onRestaurantSelect(restaurant.id)}
            >
              <div className="d-flex align-items-start justify-content-between">
                <h5
                  style={
                    restaurant.id === selectedRestaurantId
                      ? { fontWeight: "bold" }
                      : undefined
                  }
                >
                  {restaurant.name}
                </h5>
                <div className="d-flex gap-1 align-items-center small text-muted">
                  {restaurant.rating}{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 260 245"
                  >
                    <path d="m56,237 74-228 74,228L10,96h240" />
                  </svg>
                </div>
              </div>

              <p>{restaurant.shortDescription}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default RestaurantList;
