import InputMask from "react-input-mask";
import { useField } from "formik";

export const FaxInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id}>{label}</label>
      <InputMask
        mask='+7 (999) 999-99-99'
        placeholder='Enter fax'
        {...field}
        {...props}
      />

      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </>
  );
};
