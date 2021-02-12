import { TextInput } from "../TextInput";
import { Avatar } from "./Avatar/Avatar";
import { PasswordInput } from "./PasswordInput";
// import { useFormikContext } from "formik";

export const Account = () => {
  // const {
  //   errors: { username, password, passwordRepeat },
  // } = useFormikContext();

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
