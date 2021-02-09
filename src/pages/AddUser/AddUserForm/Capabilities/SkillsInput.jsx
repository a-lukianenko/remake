import { useState } from "react";
import { useField } from "formik";
import Select from "react-select";

const skillsOptions = [
  { value: "HTML", label: "HTML" },
  { value: "CSS", label: "CSS" },
  { value: "JavaScript", label: "JavaScript" },
  { value: "React", label: "React" },
  { value: "Angular", label: "Angular" },
  { value: "jQuery", label: "jQuery" },
  { value: "NodeJS", label: "NodeJS" },
  { value: "Python", label: "Python" },
  { value: "PHP", label: "PHP" },
  { value: "Ruby on Rails", label: "Ruby on Rails" },
  { value: "SQL", label: "SQL" },
  { value: "BackboneJS", label: "BackboneJS" },
  { value: "Web Design", label: "Web Design" },
  { value: "Project Management", label: "Project Management" },
  { value: "Git", label: "Git" },
  { value: "Docker", label: "Docker" },
  { value: "AWS Lambda", label: "AWS Lambda" },
  { value: "Firebase", label: "Firebase" },
];

export const SkillsInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  let { value } = field;

  const initial =
    value?.length > 0 ? value.map(value => ({ value, label: value })) : null;
  const [selectedOptions, setSelectedOption] = useState(initial);

  const { name, onBlur } = field;
  const { setValue, setTouched } = helpers;

  const handleSelect = options => {
    setSelectedOption(options);
    const arr = options.map(option => option.value);
    setValue(arr);
    setTouched(true);
  };

  return (
    <div>
      <label htmlFor={props.id}>{label}</label>
      <Select
        closeMenuOnSelect={false}
        defaultValue={selectedOptions}
        onChange={options => handleSelect(options)}
        onBlur={onBlur}
        onFocus={() => setTouched(true)}
        options={skillsOptions}
        noOptionsMessage={() => "not found"}
        placeholder='Select 3 skills'
        isSearchable
        isMulti
        name={name}
        {...props}
      />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </div>
  );
};
