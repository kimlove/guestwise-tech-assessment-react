import React from "react";
import { Card, Container } from "react-bootstrap";
import { Restaurant } from "../types/restaurants";

type RestaurantDetailsProps = {
  restaurant: Restaurant;
};

// Let's pass the restaurant details directly into this component rather than fetching them from the API based on the selected id prop
export const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({
  restaurant,
}) => {
  return (
    <Container className="fade-in">
      <Card>
        <Card.Body>
          <Card.Title>{restaurant.name}</Card.Title>
          <Card.Text>Address: {restaurant.details.address}</Card.Text>
          <Card.Text>Review Score: {restaurant.rating}</Card.Text>
          <Card.Text>Contact: {restaurant.details.contactEmail}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};
