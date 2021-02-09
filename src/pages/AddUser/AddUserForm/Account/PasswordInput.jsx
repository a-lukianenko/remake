import { useRef } from "react";
import { useField } from "formik";
import css from "../TextInput.module.css";

export const PasswordInput = ({ label, className, ...props }) => {
  const [field, meta] = useField(props);

  const inputRef = useRef();
  const buttonRef = useRef();

  const togglePasswordDisplay = e => {
    buttonRef.current.className.includes("showPassword")
      ? (buttonRef.current.className = css.togglePassword)
      : (buttonRef.current.className = `${css.togglePassword} ${css.showPassword}`);

    inputRef.current.type === "password"
      ? (inputRef.current.type = "text")
      : (inputRef.current.type = "password");
  };

  return (
    <div>
      <label htmlFor={props.id} className={css[className]}>
        {label}
        <input {...field} {...props} ref={inputRef} />
        {className === "password-field" && (
          <span
            ref={buttonRef}
            onClick={togglePasswordDisplay}
            className={css.togglePassword}
          >
            &#128065;
          </span>
        )}
      </label>
      {meta.touched && meta.error ? (
        <div className={css.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};
