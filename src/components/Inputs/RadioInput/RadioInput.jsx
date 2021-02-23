import { useField } from "formik";
import { label } from "./RadioInputGroup.module.css";

export const RadioInput = ({ name, value, type }) => {
  const [field] = useField({ name, type, value: value.label });
  return (
    <label htmlFor={value.value}>
      <input {...field} type={type} id={value.value} />
      <span className={label}>
        {value.label.toUpperCase()[0] + value.label.slice(1)}
      </span>
    </label>
  );
};
