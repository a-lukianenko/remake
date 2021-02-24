import { useState } from "react";
import { useField } from "formik";
import DatePicker, { registerLocale } from "react-datepicker";
import enGb from "date-fns/locale/en-GB";
import {
  labelText,
  required,
} from "components/Inputs/TextInput/TextInput.module.css";
import "react-datepicker/dist/react-datepicker.css";
import "./BirthDateInput.css";
import { ReactComponent as Calender } from "assets/img/calendar.svg";

registerLocale("en-gb", enGb);

export const BirthDateInput = ({ label, id, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;
  const { name, value } = field;

  const handleChange = date => {
    setStartDate(date);
    setTouched(true);
    setValue(date);
  };

  const [startDate, setStartDate] = useState(new Date(value));

  return (
    <div>
      <label htmlFor={id} style={{ maxWidth: 245 }}>
        {label}
        {props.required ? <span className={required}>&#42;</span> : null}
        <DatePicker
          id={id}
          locale='en-gb'
          selected={startDate}
          dateFormat='dd/MM/yyyy'
          formatWeekDay={day => day.substr(0, 3)}
          onChange={date => handleChange(date)}
          placeholderText='DD/MM/YYYY'
          {...props}
          name={name}
        />
        <Calender className='calendarIcon' />
      </label>

      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </div>
  );
};
