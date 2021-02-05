import { useField } from "formik";
import css from "./TextInput.module.css";

export const TextInput = ({ label, className, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id} className={css[className]}>
        {label}
        <input {...field} {...props} />
        {className === "password-field" && (
          <button className={css.togglePassword}>&#128065;</button>
        )}
      </label>
      {meta.touched && meta.error ? (
        <div className={css.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};
