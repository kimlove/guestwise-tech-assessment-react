import React from "react";
import { ListGroup, Container } from "react-bootstrap";

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
  return (
    <Container>
      <h2>Restaurants</h2>
      <ListGroup>
        {restaurants.map((restaurant) => (
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
    </Container>
  );
};

export default RestaurantList;
