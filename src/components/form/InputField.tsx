import React from "react";
import { Form } from "react-bootstrap";

type InputFieldProps = {
  label: string;
  name: string;
  type: string;
  required: boolean;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputField = ({
  label,
  name,
  type,
  required,
  value,
  onChange,
}: InputFieldProps) => {
  return (
    <Form.Group className="d-flex align-items-center mb-3">
      <Form.Label
        htmlFor={name}
        className="me-3 mb-0"
        style={{ width: "120px" }}
      >
        {label}
      </Form.Label>
      <Form.Control
        type={type}
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        style={{ width: "200px" }}
        className="w-100 w-md-auto" // Full width on mobile, fixed width on larger screens
      />
    </Form.Group>
  );
};
