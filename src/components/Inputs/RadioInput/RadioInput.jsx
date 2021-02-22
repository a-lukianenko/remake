import { useField } from "formik";

export const RadioInput = ({ name, value, type }) => {
  const [field] = useField({ name, type, value: value.label });
  return (
    <label htmlFor={value.value}>
      <input {...field} type={type} id={value.value} />
      <span>{value.label}</span>
    </label>
  );
};
