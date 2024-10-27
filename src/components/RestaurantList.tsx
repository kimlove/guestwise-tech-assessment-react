import React, { useState } from "react";
import {
  ListGroup,
  Container,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";

type Restaurant = {
  id: number;
  name: string;
  shortDescription: string;
};

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

  const searchQueryHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const resetSearchHandler = () => {
    setSearch("");
  };

  // search restaurants based on the search input and check name and shortDescription
  const filteredRestaurants = restaurants.filter((restaurant) =>
    `${restaurant.name} ${restaurant.shortDescription}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Container>
      <h2>Restaurants</h2>

      <InputGroup className="mb-3">
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

      {filteredRestaurants.length === 0 ? (
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
          {filteredRestaurants.map((restaurant) => (
            <ListGroup.Item
              key={restaurant.id}
              action
              onClick={() => onRestaurantSelect(restaurant.id)}
            >
              <h5
                style={
                  restaurant.id === selectedRestaurantId
                    ? { fontWeight: "bold" }
                    : undefined
                }
              >
                {restaurant.name}
              </h5>
              <p>{restaurant.shortDescription}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default RestaurantList;
