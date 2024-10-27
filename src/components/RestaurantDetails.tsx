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
    <Container className="mt-4 fade-in">
      <Card>
        <Card.Body>
          <Card.Title>{restaurant.name}</Card.Title>
          <Card.Text>Address: {restaurant.details.address}</Card.Text>
          <Card.Text>Review Score: {restaurant.rating}</Card.Text>
          <Card.Text className="d-flex gap-2">
            <span>Opening hours: </span>
            <ul className="list-unstyled">
              <li>Weekday: {restaurant.details.openingHours.weekday}</li>
              <li>Weekend: {restaurant.details.openingHours.weekend}</li>
            </ul>
          </Card.Text>
          <Card.Text>
            Contact:{" "}
            <strong>
              <a href={`mailto:${restaurant.details.contactEmail}`}>
                {restaurant.details.contactEmail}
              </a>
            </strong>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};
