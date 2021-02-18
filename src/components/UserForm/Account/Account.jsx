import { AvatarInput } from "components/Inputs/AvatarInput/AvatarInput";
import { TextInput } from "components/Inputs/TextInput/TextInput";

export const Account = () => {
  return (
    <div>
      <AvatarInput name='avatar' />
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
  );
};
