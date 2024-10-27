import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Restaurant } from "../types/restaurants";

type RestaurantDetailsProps = {
  restaurant: Restaurant;
};

export const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({
  restaurant,
}) => {
  return (
    <Container className="mt-4 fade-in">
      <Card>
        <Card.Body>
          <Card.Title className="mb-4">{restaurant.name}</Card.Title>

          <Row className="mb-2">
            <Col xs={4} className="text-muted">
              Address:
            </Col>
            <Col xs={8}>{restaurant.details.address}</Col>
          </Row>

          <Row className="mb-2">
            <Col xs={4} className="text-muted">
              Review Score:
            </Col>
            <Col xs={8}>{restaurant.rating}</Col>
          </Row>

          <Row className="mb-2">
            <Col xs={4} className="text-muted">
              Cuisine:
            </Col>
            <Col xs={8}>{restaurant.cuisine}</Col>
          </Row>

          <Row className="mb-2">
            <Col xs={4} className="text-muted">
              Opening Hours:
            </Col>
            <Col xs={8}>
              <ul className="list-unstyled mb-0">
                <li>Weekday: {restaurant.details.openingHours.weekday}</li>
                <li>Weekend: {restaurant.details.openingHours.weekend}</li>
              </ul>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col xs={4} className="text-muted">
              Contact:
            </Col>
            <Col xs={8}>
              <a
                href={`mailto:${restaurant.details.contactEmail}`}
                className="fw-bold"
              >
                {restaurant.details.contactEmail}
              </a>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};
