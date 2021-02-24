import { UserForm } from "components/UserForm/UserForm";
import { h2 } from "../UserList/UserList.module.css";

export const AddUser = () => {
  return (
    <section>
      <h2 className={h2}>Adding new user</h2>
      <UserForm />
    </section>
  );
};
