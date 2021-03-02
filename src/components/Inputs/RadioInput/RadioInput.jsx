import { useField } from "formik";
import { RadioInputType } from "types/types";

export const RadioInput = ({
  name,
  value,
  type,
  labelStyle,
  inputStyle,
  labelWrapper,
}) => {
  const [field] = useField({ name, type, value: value.label });
  return (
    <label htmlFor={value.value} className={labelWrapper}>
      <input {...field} type={type} id={value.value} className={inputStyle} />
      <span className={labelStyle}>
        {value.label.toUpperCase()[0] + value.label.slice(1)}
      </span>
    </label>
  );
};

RadioInput.propTypes = RadioInputType;
