import { TextInput } from "../TextInput";
import { Avatar } from "./Avatar/Avatar";
import { PasswordInput } from "./PasswordInput";

export const Account = () => {
  return (
    <div>
      <Avatar name='avatar' />
      <TextInput label='User name' type='text' id='username' name='username' />

      <PasswordInput
        label='Password'
        type='password'
        id='password'
        name='password'
        className='password-field'
      />

      <PasswordInput
        label='Repeat password'
        type='password'
        id='passwordRepeat'
        name='passwordRepeat'
        className='password-field'
      />
    </div>
  );
};
