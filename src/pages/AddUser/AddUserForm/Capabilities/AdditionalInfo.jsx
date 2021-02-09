import { Field } from "formik";

export const AdditionalInfo = () => {
  return (
    <>
      <label>Additional Information</label>
      <Field
        as='textarea'
        name='additionalInfo'
        placeholder='Anything else we should know about you...'
      />
    </>
  );
};
