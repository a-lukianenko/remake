import { useState } from "react";
import { useField } from "formik";
import {
  labelText,
  required,
  invalid,
  errorMessage,
  input,
  password,
  showPassword,
} from "./InputField.module.css";

export const InputField = ({ label, type, ...props }) => {
  const [field, meta] = useField(props);
  // const { touched, error } = meta;

  const [inputType, setInputType] = useState(type);

  const togglePasswordDisplay = () =>
    inputType === "password" ? setInputType("text") : setInputType("password");

  return (
    <div>
      <label htmlFor={props.id} className={labelText}>
        {label}
        <span className={props.required ? required : ""}>&#42;</span>

        <input
          {...field}
          {...props}
          type={inputType}
          className={`${input} ${meta.touched && meta.error ? invalid : ""}`}
        />
        {props.id.includes("password") && (
          <span
            onClick={togglePasswordDisplay}
            className={
              inputType === "password"
                ? password
                : `${password} ${showPassword}`
            }
          >
            &#128065;
          </span>
        )}
      </label>
      {meta.touched && meta.error ? (
        <div className={errorMessage}>{meta.error}</div>
      ) : null}
    </div>
  );
};
