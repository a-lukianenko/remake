import { Field } from "formik";

export const RadioInput = () => {
  return (
    <div>
      <label>Gender</label>
      <label>
        <Field type='radio' name='gender' value='male' checked />
        Male
      </label>
      <label>
        <Field type='radio' name='gender' value='female' />
        Female
      </label>
    </div>
  );
};
