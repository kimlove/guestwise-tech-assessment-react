import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Col, Container, Row } from "react-bootstrap";
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

  if (!restaurants) {
    return <Loading onRetry={fetchRestaurants} />;
  }

  // Find the selected restaurant based on the selected id otherwise set it to null
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
          ) : null}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
