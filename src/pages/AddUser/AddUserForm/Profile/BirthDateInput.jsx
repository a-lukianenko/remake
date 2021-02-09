import { useState } from "react";
import { useField } from "formik";
import InputMask from "react-input-mask";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const BrithDateInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const [startDate, setStartDate] = useState(new Date());

  // const day = /(0[1-9]|[12][0-9]|3[01])/;
  // const month = /(0[1-9]|1[012])/;
  // const year = /(19|20)\d\d/;

  // const mask = [day, "/", month, "/", year];

  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <InputMask
        mask='99/99/9999'
        placeholder={"DD/MM/YYYY"}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
      <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
    </>
  );
};
