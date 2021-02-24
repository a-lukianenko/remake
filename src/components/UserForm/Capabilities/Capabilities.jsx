import { skills, hobbies } from "utils/formData";
import { SelectInput } from "components/Inputs/SelectInput/SelectInput";
import { RadioInputGroup } from "components/Inputs/RadioInput/RadioInputGroup";
import { TextAreaInput } from "components/Inputs/TextAreaInput/TextAreaInput";
import {
  container,
  label,
  labelWrapper,
  inputStyle,
  textArea,
} from "./Capabilities.module.css";

export const Capabilities = () => {
  return (
    <div style={style.contacts}>
      <div className={container}>
        <SelectInput
          id='skills'
          name='skills'
          label='Skills'
          selectOptions={skills}
          placeholder={"Select 3 skills"}
          isMulti
        />
        <TextAreaInput
          className={textArea}
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

const style = {
  contacts: {
    display: "flex",
    justifyContent: "space-between",
  },
};
