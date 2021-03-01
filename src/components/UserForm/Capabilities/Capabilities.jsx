import { skills, hobbies } from "utils/formData";
import { SelectInput } from "components/Inputs/SelectInput/SelectInput";
import { RadioInputGroup } from "components/Inputs/RadioInput/RadioInputGroup";
import { TextAreaInput } from "components/Inputs/TextAreaInput/TextAreaInput";
import {
  capabilities,
  container,
  label,
  labelWrapper,
  inputStyle,
} from "./Capabilities.module.css";

export const Capabilities = () => {
  return (
    <div className={capabilities}>
      <div className={container}>
        <SelectInput
          id='skills'
          name='skills'
          label='Skills'
          selectOptions={skills}
          placeholder={"Select 3 skills"}
          isMulti
          indicatorsContainer
        />
        <TextAreaInput
          id='additionalInfo'
          name='additionalInfo'
          label='Additional Information'
          rows='5'
          cols='33'
        />
      </div>
      <div className={container}>
        <RadioInputGroup
          type='checkbox'
          name='hobbies'
          label='My hobbies'
          values={hobbies}
          labelStyle={label}
          inputStyle={inputStyle}
          labelWrapper={labelWrapper}
        />
      </div>
    </div>
  );
};
