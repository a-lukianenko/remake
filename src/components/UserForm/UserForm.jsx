import { Account } from "./Account/Account";
import { Profile } from "./Profile/Profile";
import { Contacts } from "./Contacts/Contacts";
import { Capabilities } from "./Capabilities/Capabilities";

import { UserFormType } from "types/types";
import { FormStepper } from "./FormStepper/FormStepper";

export const UserForm = ({ valuesToEdit, userId }) => {
  return (
    <FormStepper valuesToEdit={valuesToEdit} userId={userId}>
      <Account />
      <Profile />
      <Contacts />
      <Capabilities />
    </FormStepper>
  );
};

UserForm.propTypes = UserFormType;
