import React, { useState, useEffect } from "react";
import { Spinner, Button, Container } from "react-bootstrap";

type LoadingScreenProps = {
  onRetry: () => void;
};

export const Loading: React.FC<LoadingScreenProps> = ({ onRetry }) => {
  const [loadingFailed, setLoadingFailed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoadingFailed(true), 5000); // Allow 5 seconds for the loading to complete -- this could be improved rather than just relying on a timeout

    return () => clearTimeout(timer);
  }, [loadingFailed]);

  const retryHandler = () => {
    setLoadingFailed(false);
    onRetry();
  };

  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center fade-in"
      style={{ height: "100vh" }}
    >
      {loadingFailed ? (
        <>
          <p>Sorry, unable to load restaurants, please try again</p>
          <Button variant="primary" onClick={retryHandler}>
            Reload
          </Button>
        </>
      ) : (
        <>
          <p className="mb-4">Loading booking system...</p>
          <Spinner animation="border" role="status" />
        </>
      )}
    </Container>
  );
};
