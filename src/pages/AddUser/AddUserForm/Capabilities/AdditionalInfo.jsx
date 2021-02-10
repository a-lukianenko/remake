import { useField } from "formik";

export const AdditionalInfo = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id}>{label}</label>
      <textarea
        {...field}
        {...props}
        rows='5'
        cols='33'
        style={{ resize: "none" }}
      />
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </>
  );
};
