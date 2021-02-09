import { AdditionalInfo } from "./AdditionalInfo";
import { SkillsInput } from "./SkillsInput";
import { Hobbies } from "./Hobbies";

export const Capabilities = () => {
  return (
    <div style={style.contacts}>
      <div>
        <SkillsInput />
        <AdditionalInfo />
      </div>
      <div>
        <Hobbies />
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
