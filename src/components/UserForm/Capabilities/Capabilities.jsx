import { skills, hobbies } from "utils/formData";
import { SelectInput } from "components/Inputs/SelectInput/SelectInput";
import { RadioInputGroup } from "components/Inputs/RadioInput/RadioInputGroup";
import { TextAreaInput } from "components/Inputs/TextAreaInput/TextAreaInput";

export const Capabilities = () => {
  return (
    <div style={style.contacts}>
      <div>
        <SelectInput
          id='skills'
          name='skills'
          label='Skills'
          selectOptions={skills}
          placeholder={"Select 3 skills"}
          isMulti
        />
        <TextAreaInput
          id='additionalInfo'
          name='additionalInfo'
          label='Additional Information'
          rows='5'
          cols='33'
        />
      </div>
      <div>
        <RadioInputGroup
          type='checkbox'
          name='hobbies'
          label='My hobbies'
          values={hobbies}
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
