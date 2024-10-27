import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Col, Container, Row } from "react-bootstrap";
import RestaurantList from "./components/RestaurantList";
import { RestaurantDetails } from "./components/RestaurantDetails";
import BookTable from "./components/BookTable";
import { getRestaurants } from "./services/api";

function App() {
  const [restaurants, setRestaurants] = useState<any[] | null>(null);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<
    number | null
  >(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const data = await getRestaurants();

      if (data) {
        setRestaurants(data);
      } else {
        console.error("Failed to fetch restaurants");
      }
    };
    fetchRestaurants();
  }, []);

  if (!restaurants) {
    // stub loading a basic state for now
    return <div>Loading...</div>;
  }

  // Find the selected restaurant based on the selected id otherwise set it to null
  const selectedRestaurant = selectedRestaurantId
    ? restaurants.find((restaurant) => restaurant.id === selectedRestaurantId)
    : null;

  return (
    <Container>
      <Row>
        <Col md={4}>
          <RestaurantList
            onRestaurantSelect={setSelectedRestaurantId}
            restaurants={restaurants}
          />
        </Col>
        <Col md={8}>
          {selectedRestaurant ? (
            <>
              <RestaurantDetails restaurant={selectedRestaurant} />
              <BookTable />
            </>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
