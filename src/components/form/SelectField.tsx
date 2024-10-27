import React from "react";
import { Form } from "react-bootstrap";

type SelectFieldProps = {
  label: string;
  name: string;
  value: number;
  min: number;
  max: number;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  value,
  min,
  max,
  required = false,
  onChange,
}) => {
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
        as="select"
        name={name}
        id={name}
        value={value}
        required={required}
        // The type assertion is necessary because the event type is not inferred correctly -- use this for now
        onChange={(event) =>
          onChange(event as unknown as React.ChangeEvent<HTMLSelectElement>)
        }
        style={{ width: "200px" }}
        className="w-100 w-md-auto"
      >
        {[...Array(max - min + 1)].map((_, index) => {
          const optionValue = min + index;
          return (
            <option key={optionValue} value={optionValue}>
              {optionValue}
            </option>
          );
        })}
      </Form.Control>
    </Form.Group>
  );
};
