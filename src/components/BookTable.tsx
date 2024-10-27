import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { InputField } from "./form/inputField";

// array of form fields we can map over
const formFields: {
  label: string;
  name: keyof FormData;
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
  guests: 0,
};

type FormData = typeof defaultFormData;

const BookTable: React.FC = ({}) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
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
      <form onSubmit={handleSubmit}>
        <ul className="list-unstyled">
          {formFields.map(
            (
              field // map over formFields array
            ) => (
              <li key={field.name}>
                <InputField
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
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
