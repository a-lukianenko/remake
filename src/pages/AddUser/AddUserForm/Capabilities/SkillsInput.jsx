import { useState } from "react";
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

export const SkillsInput = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div>
      <label>Skills</label>
      <Select
        closeMenuOnSelect={false}
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={skillsOptions}
        noOptionsMessage={() => "not found"}
        placeholder='Select at least 3 skills'
        isSearchable
        isMulti
      />
    </div>
  );
};
