import { useState } from "react";
import { useField } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const BirthDateInput = ({ label, id, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;
  const { name, value } = field;

  const handleChange = date => {
    setStartDate(date);
    setTouched(true);
    setValue(date);
  };

  const [startDate, setStartDate] = useState(value);

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <DatePicker
        selected={startDate}
        onChange={date => handleChange(date)}
        {...props}
        name={name}
      />
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </div>
  );
};
