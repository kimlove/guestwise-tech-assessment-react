import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Col, Container, Row, Button } from "react-bootstrap";
import RestaurantList from "./components/listing/RestaurantList";
import { RestaurantDetails } from "./components/RestaurantDetails";
import BookTable from "./components/BookTable";
import { getRestaurants } from "./services/api";
import { Restaurant } from "./types/restaurants";
import { Loading } from "./components/Loading";

function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[] | null>(null);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<
    number | null
  >(null);

  const fetchRestaurants = async () => {
    const data = await getRestaurants();
    if (data) {
      setRestaurants(data);
    } else {
      console.error("Failed to fetch restaurants");
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // If the restaurants are still loading, show the loading component
  if (!restaurants) {
    return <Loading onRetry={fetchRestaurants} />;
  }

  const selectRandomRestaurant = () => {
    if (restaurants.length > 0) {
      const randomIndex = Math.floor(Math.random() * restaurants.length);
      setSelectedRestaurantId(restaurants[randomIndex].id);
    }
  };

  const selectedRestaurant = selectedRestaurantId
    ? restaurants.find((restaurant) => restaurant.id === selectedRestaurantId)
    : null;

  return (
    <Container className="pb-4">
      <Row className="header-gradient text-center p-3 m-3 mb-0 rounded">
        <Col>
          <h1 className="h4 mb-0">Discover & Book Restaurants</h1>
        </Col>
      </Row>
      <Row>
        <Col lg={4}>
          <RestaurantList
            onRestaurantSelect={setSelectedRestaurantId}
            restaurants={restaurants}
            selectedRestaurantId={selectedRestaurantId}
          />
        </Col>
        <Col lg={8}>
          {selectedRestaurant ? (
            <>
              <RestaurantDetails restaurant={selectedRestaurant} />
              <BookTable
                restaurantId={selectedRestaurant.id}
                restaurantName={selectedRestaurant.name}
                restaurantEmail={selectedRestaurant.details.contactEmail}
              />
            </>
          ) : (
            <div
              className="d-flex flex-column align-items-center justify-content-center text-center mt-4"
              style={{ height: "50vh" }}
            >
              <h5 className="mb-3">Select a restaurant to view details</h5>
              <Button variant="primary" onClick={selectRandomRestaurant}>
                Surprise Me!
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
