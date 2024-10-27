import React from "react";
import { Card, Container } from "react-bootstrap";

// we'll move this into a shared types file later
type RestaurantDetailsProps = {
  restaurant: {
    name: string;
    details: {
      address: string;
      openingHours: {
        weekday: string;
        weekend: string;
      };
      reviewScore: number;
      contactEmail: string;
    };
  };
};

// Let's pass the restaurant details directly into this component rather than fetching them from the API based on the selected id prop
export const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({
  restaurant,
}) => {
  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>{restaurant.name}</Card.Title>
          <Card.Text>Address: {restaurant.details.address}</Card.Text>
          <Card.Text>Review Score: {restaurant.details.reviewScore}</Card.Text>
          <Card.Text>Contact: {restaurant.details.contactEmail}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};
