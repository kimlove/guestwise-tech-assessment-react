import React, { useState, useEffect } from "react";
import { Container, Button, Form, Alert, Card } from "react-bootstrap";
import { InputField } from "./form/InputField";
import { validateBookingData } from "../lib/validateBookingData";
import { BookingForm } from "../types/forms";
import { SelectField } from "./form/SelectField";

type BookTableProps = {
  restaurantId: number;
  restaurantName: string;
  restaurantEmail: string;
};

const formFields: {
  label: string;
  name: keyof BookingForm;
  type: string;
  required: boolean;
}[] = [
  { label: "Name", name: "name", type: "text", required: true },
  { label: "Email", name: "email", type: "email", required: true },
  { label: "Phone", name: "phone", type: "tel", required: true },
  { label: "Date", name: "date", type: "date", required: true },
  { label: "Time", name: "time", type: "time", required: true },
  { label: "Guests", name: "guests", type: "number", required: true },
];

const defaultFormData: BookingForm = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  guests: 1,
};

const BookTable: React.FC<BookTableProps> = ({
  restaurantId,
  restaurantName,
  restaurantEmail,
}) => {
  const [formData, setFormData] = useState<BookingForm>(defaultFormData);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // if the restaurantId changes, reset state
  useEffect(() => {
    setFormData(defaultFormData);
    setErrors([]);
    setIsSubmitting(false);
    setIsSuccess(false);
  }, [restaurantId]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (errors.length > 0) {
      setErrors([]);
    }

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const { isValid, errors } = validateBookingData(formData);
    if (!isValid) {
      setErrors(errors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restaurantId,
          restaurantName,
          ...formData,
        }),
      });

      if (!response.ok) throw new Error("Booking failed");

      setIsSuccess(true); // Show success message
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(defaultFormData);
    setErrors([]);
    setIsSuccess(false);
  };

  return (
    <Container className="mt-4 fade-in">
      {isSuccess ? (
        <div className="my-4">
          <Card className="border bg-light">
            <Card.Body>
              <Card.Title as="h5">
                Thank You for Booking at {restaurantName}!
              </Card.Title>
              <Card.Text>Your Booking Details:</Card.Text>

              <ul className="list-unstyled mb-4 p-3 bg-white rounded border">
                {Object.entries(formData).map(([key, value]) => (
                  <li key={key} className="mb-2">
                    <strong>
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </strong>{" "}
                    {value}
                  </li>
                ))}
              </ul>

              <Card.Text className="mb-4">
                If you would like to amend or update your booking, please email{" "}
                <a
                  href={`mailto:${restaurantEmail}`}
                  className="text-primary fw-bold"
                >
                  {restaurantEmail}
                </a>
              </Card.Text>

              <Button variant="primary" onClick={resetForm}>
                Book Again
              </Button>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <Form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
          <h3 className="mb-4 h5">Book a Table at {restaurantName}</h3>

          {errors.length > 0 && (
            <Alert variant="danger">
              <ul className="mb-0">
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </Alert>
          )}

          {formFields.map((field) => (
            <Form.Group key={field.name} className="mb-3">
              {field.name === "guests" ? (
                <SelectField
                  label={field.label}
                  name="guests"
                  min={1}
                  max={12}
                  value={formData.guests}
                  required={field.required}
                  onChange={handleChange}
                />
              ) : (
                <InputField
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              )}
            </Form.Group>
          ))}

          <div className="d-grid">
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? "Booking..." : `Book at ${restaurantName}`}
            </Button>
          </div>
        </Form>
      )}
    </Container>
  );
};

export default BookTable;
