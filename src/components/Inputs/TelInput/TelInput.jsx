import InputMask from "react-input-mask";
import { useField } from "formik";
import { ReactComponent as Minus } from "assets/img/minus.svg";
import { container, btn } from "./TelInput.module.css";

export const TelInput = ({ label, removePhone, ...props }) => {
  const [field, meta] = useField(props);
  // const { touched, error } = meta;

  return (
    <div className={container}>
      <label htmlFor={props.id}>{label}</label>
      <InputMask mask='+7 (999) 999-99-99' {...props} {...field} type='tel' />
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
      <button
        onClick={() => removePhone(field.name)}
        type='button'
        className={btn}
      >
        <Minus title='remove phone' />
      </button>
    </div>
  );
};
