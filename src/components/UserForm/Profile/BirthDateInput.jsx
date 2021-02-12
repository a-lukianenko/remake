import { useState } from "react";
import { useField } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const BirthDateInput = ({ label, id, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;
  const { name, value } = field;
  const { touched, error } = meta;

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
        name={name}
        selected={startDate}
        onChange={date => handleChange(date)}
        {...props}
      />
      {touched && error ? <div className='error'>{error}</div> : null}
    </div>
  );
};
