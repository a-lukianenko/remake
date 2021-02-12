import { AdditionalInfo } from "./AdditionalInfo";
import { SkillsInput } from "./SkillsInput";
import { Hobbies } from "./Hobbies";

export const Capabilities = () => {
  return (
    <div style={style.contacts}>
      <div>
        <SkillsInput id='skills' name='skils' label='Skills' />
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
