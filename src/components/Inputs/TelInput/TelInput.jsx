import InputMask from "react-input-mask";
import { useField } from "formik";
import { ReactComponent as Minus } from "assets/img/minus.svg";
import { container, btn, input } from "./TelInput.module.css";
import { TelInputType } from "types/types";

export const TelInput = ({
  label = "Phone",
  removePhone,
  isRemovable,
  ...props
}) => {
  const [field, meta] = useField(props);
  // const { touched, error } = meta;

  return (
    <div className={container}>
      <label htmlFor={props.id}>
        {label}
        <InputMask
          mask='+7 (999) 999-99-99'
          {...props}
          {...field}
          type='tel'
          className={input}
        />
        {meta.touched && meta.error ? (
          <div className='error'>{meta.error}</div>
        ) : null}
        {isRemovable && (
          <button
            onClick={() => removePhone(field.name)}
            type='button'
            className={btn}
          >
            <Minus title='remove phone' />
          </button>
        )}
      </label>
    </div>
  );
};

TelInput.propTypes = TelInputType;
