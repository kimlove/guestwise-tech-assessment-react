import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Col, Container, Row } from "react-bootstrap";
import RestaurantList from "./components/RestaurantList";
import RestaurantDetails from "./components/RestaurantDetails";
import BookTable from "./components/BookTable";
import { getRestaurants } from "./services/api";

function App() {
  const [restaurants, setRestaurants] = useState([]);
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
          {selectedRestaurantId && (
            <>
              <RestaurantDetails restaurantId={selectedRestaurantId} />
              <BookTable />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
