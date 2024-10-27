import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { InputField } from "./form/inputField";
import { validateBookingData } from "../lib/validateBookingData";
import { BookingForm } from "../types/forms";
import { SelectField } from "./form/selectField";

// array of form fields we can map over
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

const defaultFormData = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  guests: 1,
};

const BookTable: React.FC = ({}) => {
  const [formData, setFormData] = useState<BookingForm>(defaultFormData);
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // reset errors if there are any
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

    const { isValid, errors } = validateBookingData(formData);
    if (!isValid) {
      setErrors(errors);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Booking failed");

      console.log("Booking successful");
    } catch (err) {
      console.log(err);
    } finally {
      console.log("Completed request");
    }
  };

  return (
    <Container>
      <h2>Book a Table</h2>
      {errors.length > 0 ? (
        <ul>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      ) : null}
      <form onSubmit={handleSubmit}>
        <ul className="list-unstyled">
          {formFields.map(
            (
              field // map over formFields array
            ) => (
              <li key={field.name}>
                {field.name === "guests" ? ( // as we have a defined min / max for guests, drop in a select menu
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
              </li>
            )
          )}

          <li>
            <button type="submit">Book</button>
          </li>
        </ul>
      </form>
    </Container>
  );
};

export default BookTable;
