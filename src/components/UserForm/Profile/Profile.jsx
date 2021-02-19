import { TextInput } from "components/Inputs/TextInput/TextInput";
import { BirthDateInput } from "components/Inputs/BirthDateInput/BirthDateInput";
import { RadioInputGroup } from "components/Inputs/RadioInput/RadioInputGroup";
import { AddressInput } from "components/Inputs/AddressInput/AddressInput";
import { profile } from "./Profile.module.css";

export const Profile = () => {
  return (
    <div className={profile}>
      <div>
        <TextInput
          label='First name'
          type='text'
          id='firstName'
          name='firstName'
          required
        />
        <TextInput
          label='Last name'
          type='text'
          id='lastName'
          name='lastName'
          required
        />
        {/* <BirthDateInput id='birthDate' label='Birth date' name='birthDate' /> */}
      </div>
      <div>
        <TextInput
          label='Email'
          type='email'
          id='email'
          name='email'
          required
        />

        <AddressInput
          id='address'
          name='address'
          label='Address'
          type='search'
          autoComplete='off'
          placeholder='Search address'
        />

        <RadioInputGroup
          type='radio'
          name='gender'
          label='Gender'
          values={[
            { value: "male", label: "male" },
            { value: "female", label: "female" },
          ]}
        />
      </div>
    </div>
  );
};
