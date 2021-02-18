import { useField } from "formik";

export const RadioInput = ({ name, value, type }) => {
  const [field] = useField({ name, type, value });
  return (
    <label htmlFor={value}>
      <input {...field} type={type} id={value} />
      <span>{value}</span>
    </label>
  );
};
