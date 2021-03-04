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
} from "./TextInput.module.css";
import { ReactComponent as Eye } from "assets/img/eye.svg";
import { ReactComponent as EyeStrike } from "assets/img/eyeStrike.svg";

import { TextInputType } from "types/types";

export const TextInput = ({ label, type = "text", ...props }) => {
  const [field, meta, helpers] = useField(props);

  const [inputType, setInputType] = useState(type);

  const togglePasswordDisplay = () =>
    inputType === "password" ? setInputType("text") : setInputType("password");

  return (
    <div>
      <label htmlFor={props.id} className={labelText}>
        {label}
        {props.required ? <span className={required}>&#42;</span> : null}

        <input
          {...field}
          {...props}
          type={inputType}
          className={`${input} ${meta.touched && meta.error ? invalid : ""}`}
        />
        {type === "password" && (
          <span
            onClick={togglePasswordDisplay}
            className={
              inputType === "password"
                ? password
                : `${password} ${showPassword}`
            }
          >
            {inputType === "password" ? <Eye /> : <EyeStrike />}
          </span>
        )}
      </label>
      {meta.touched && meta.error ? (
        <div className={errorMessage}>{meta.error}</div>
      ) : null}
    </div>
  );
};

TextInput.propTypes = TextInputType;
