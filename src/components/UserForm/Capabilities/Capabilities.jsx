import { AdditionalInfo } from "./AdditionalInfo";
import { Hobbies } from "./Hobbies";
import { skills } from "utils/formData";
import { SelectInput } from "components/Inputs/SelectInput/SelectInput";

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
        <AdditionalInfo
          id='additionalInfo'
          name='additionalInfo'
          label='Additional Information'
        />
      </div>
      <div>
        <Hobbies id='hobbies' name='hobbies' label='My hobbies' />
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
