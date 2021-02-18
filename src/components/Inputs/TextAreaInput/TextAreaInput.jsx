import { useField } from "formik";

export const TextAreaInput = ({ label, id, isResizable, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <textarea
        {...field}
        {...props}
        style={{ resize: isResizable ? "both" : "none" }}
      />
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </>
  );
};
