import { InputField } from "../InputField/InputField";
import { BirthDateInput } from "./BirthDateInput";
import { RadioInput } from "./RadioInput";
import { AddressInput } from "./AddressInput";

export const Profile = () => {
  return (
    <div style={style.profile}>
      <div>
        <InputField
          type='text'
          id='firstName'
          name='firstName'
          label='First name'
          required
        />

        <InputField
          type='text'
          id='lastName'
          name='lastName'
          label='Last name'
          required
        />

        <BirthDateInput id='birthDate' label='Birth date' name='birthDate' />
      </div>
      <div>
        <InputField
          label='Email'
          type='email'
          id='email'
          name='email'
          required
        />

        <AddressInput
          type='search'
          id='address'
          name='address'
          label='Address'
          autoComplete='off'
          placeholder='Search address'
        />

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
