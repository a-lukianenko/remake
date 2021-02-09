import { TextInput } from "../TextInput";
import { BirthDateInput } from "./BirthDateInput";
import { RadioInput } from "./RadioInput";

export const Profile = () => {
  return (
    <div style={style.profile}>
      <div>
        <TextInput
          label='First name'
          type='text'
          id='firstName'
          name='firstName'
        />
        <TextInput
          label='Last name'
          type='text'
          id='lastName'
          name='lastName'
        />
        <BirthDateInput id='birthDate' label='Birth date' name='birthDate' />
      </div>
      <div>
        <TextInput label='Email' type='email' id='email' name='email' />

        <TextInput label='Address' type='text' id='address' name='address' />

        <RadioInput />
      </div>
    </div>
  );
};

const style = {
  profile: {
    display: "flex",
    justifyContent: "space-between",
  },
};
