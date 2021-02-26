import { AvatarInput } from "components/Inputs/AvatarInput/AvatarInput";
import { TextInput } from "components/Inputs/TextInput/TextInput";
import { container, fieldGroup } from "./Account.module.css";

export const Account = () => {
  return (
    <div className={container}>
      <div>
        <AvatarInput name='avatar' hasBorder />
      </div>
      <div className={fieldGroup}>
        <TextInput
          label='User name'
          type='text'
          id='username'
          name='username'
          required
        />

        <TextInput
          label='Password'
          type='password'
          id='password'
          name='password'
          className='password-field'
          required
        />

        <TextInput
          label='Repeat password'
          type='password'
          id='passwordRepeat'
          name='passwordRepeat'
          className='password-field'
          required
        />
      </div>
    </div>
  );
};
