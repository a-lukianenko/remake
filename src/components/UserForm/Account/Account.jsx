import { InputField } from "../InputField/InputField";
import { Avatar } from "./Avatar/Avatar";

export const Account = () => {
  return (
    <div>
      <Avatar name='avatar' />
      <InputField
        type='text'
        id='username'
        name='username'
        label='User name'
        required
      />

      <InputField
        type='password'
        id='password'
        name='password'
        label='Password'
        required
      />

      <InputField
        type='password'
        id='passwordRepeat'
        name='passwordRepeat'
        label='Repeat password'
        required
      />
    </div>
  );
};
