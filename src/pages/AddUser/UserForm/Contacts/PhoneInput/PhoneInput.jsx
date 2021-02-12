import InputMask from "react-input-mask";
import { useField } from "formik";
import { ReactComponent as Minus } from "./minus.svg";

export const PhoneInput = ({ label, removePhone, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div style={style.container}>
      <label htmlFor={props.name}>{label}</label>
      <InputMask
        mask='+7 (999) 999-99-99'
        placeholder='Enter phone'
        {...props}
        {...field}
      />
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
      <button
        onClick={() => removePhone(field.name)}
        type='button'
        style={style.btn}
      >
        <Minus title='remove phone' />
      </button>
    </div>
  );
};

const style = {
  container: {
    position: "relative",
  },
  btn: {
    position: "absolute",
    right: "-20px",
    border: "none",
    outline: "transparent",
    padding: 0,
    background: "none",
    top: "55%",
  },
};
