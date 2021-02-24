import { useState } from "react";
import { useField } from "formik";
import Select from "react-select";

export const SelectInput = ({ label, selectOptions, isMulti, ...props }) => {
  const [field, meta, helpers] = useField(props);
  let { value } = field;

  const initial =
    value.length > 0 ? value.map(value => ({ value, label: value })) : null;
  const [selectedOptions, setSelectedOption] = useState(initial);

  const { name, onBlur } = field;
  const { setValue, setTouched } = helpers;

  const handleSelect = options => {
    setSelectedOption(options);
    const arr = !isMulti
      ? [options].map(opt => opt.value)
      : options.map(opt => opt.value);
    setValue(arr);
    setTouched(true);
  };

  return (
    <div>
      <label htmlFor={props.id}>
        {label}
        {props.required ? <span className='required'>&#42;</span> : null}
      </label>
      <Select
        closeMenuOnSelect={!isMulti}
        defaultValue={selectedOptions}
        options={selectOptions}
        onChange={option => handleSelect(option)}
        onBlur={onBlur}
        onFocus={() => setTouched(true)}
        noOptionsMessage={() => "not found"}
        isSearchable
        name={name}
        {...props}
        isMulti={isMulti}
        styles={customStyles}
      />
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </div>
  );
};

const customStyles = {
  indicatorSeparator: (provided, state) => ({
    ...provided,
    backgroundColor: "none",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    opacity: 0,
  }),
  option: (provided, state) => ({
    ...provided,
    color: "#657C9A",
    backgroundColor: state.isFocused ? "#E7F0FF" : "transparent",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "black",
    fontWeight: "bold",
  }),
  menuList: (provided, state) => ({
    ...provided,
    "&::-webkit-scrollbar": {
      width: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#C1CFE0",
      boxShadow: "inset 0 0 0 3px white",
    },
  }),
};
