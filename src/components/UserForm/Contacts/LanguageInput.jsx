import { useState } from "react";
import Select from "react-select";
import { useField } from "formik";

const languageOptions = [
  { value: "English", label: "English" },
  { value: "French", label: "French" },
  { value: "Spanish", label: "Spanish" },
  { value: "Mandarin", label: "Mandarin" },
  { value: "Russian", label: "Russian" },
  { value: "Portuguese", label: "Portuguese" },
  { value: "German", label: "German" },
  { value: "Japanese", label: "Japanese" },
  { value: "Hindi", label: "Hindi" },
  { value: "Malay", label: "Malay" },
  { value: "Persian", label: "Persian" },
  { value: "Swahili", label: "Swahili" },
  { value: "Tamil", label: "Tamil" },
  { value: "Italian", label: "Italian" },
  { value: "Dutch", label: "Dutch" },
  { value: "Bengali", label: "Bengali" },
  { value: "Turkish", label: "Turkish" },
  { value: "Vietnamese", label: "Vietnamese" },
  { value: "Polish", label: "Polish" },
  { value: "Javanese", label: "Javanese" },
  { value: "Punjabi", label: "Punjabi" },
  { value: "Thai", label: "Thai" },
  { value: "Korean", label: "Korean" },
];

export const LanguageInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { value } = field;

  const initialValue = value ? { value, label: value } : null;
  const [selectedOption, setSelectedOption] = useState(initialValue);

  const { name, onBlur } = field;
  const { setValue, setTouched } = helpers;

  const handleSelect = option => {
    setSelectedOption(option);
    setValue(option.value);
    setTouched(true);
  };

  return (
    <div>
      <label htmlFor={props.id}>{label}</label>
      <Select
        defaultValue={selectedOption}
        options={languageOptions}
        onChange={option => handleSelect(option)}
        onBlur={onBlur}
        onFocus={() => setTouched(true)}
        noOptionsMessage={() => "not found"}
        placeholder={"Select a language"}
        isSearchable
        name={name}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </div>
  );
};
