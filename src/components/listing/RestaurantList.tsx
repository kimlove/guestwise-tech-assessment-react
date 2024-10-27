import React, { useState } from "react";
import { Restaurant } from "../../types/restaurants";
import { RestaurantItem } from "./RestaurantItem";
import { SearchBar } from "./SearchBar";
import { SortOptions } from "./SortOptions";
import { ListGroup, Container, Button } from "react-bootstrap";

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

  const resetSearchHandler = () => {
    setSearch("");
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
    <Container className="mt-4 fade-in">
      <SearchBar search={search} onSearchChange={setSearch} />
      <SortOptions sortBy={sortBy} onSortChange={setSortBy} />

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
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              isSelected={restaurant.id === selectedRestaurantId}
              onSelect={() => onRestaurantSelect(restaurant.id)}
            />
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default RestaurantList;
