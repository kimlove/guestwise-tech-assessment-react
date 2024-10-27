import React from "react";

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
    <label>
      {label}
      <select name={name} value={value} required={required} onChange={onChange}>
        {[...Array(max - min + 1)].map((_, index) => {
          const optionValue = min + index;
          return (
            <option key={optionValue} value={optionValue}>
              {optionValue}
            </option>
          );
        })}
      </select>
    </label>
  );
};
