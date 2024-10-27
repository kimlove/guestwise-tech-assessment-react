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
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
      />
    </>
  );
};
