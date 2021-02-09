import { AddUserForm } from "./AddUserForm/AddUserForm";

export const AddUser = () => {
  return (
    <section>
      <h2 style={style.h2}>Adding new user</h2>
      <AddUserForm />
    </section>
  );
};

const style = {
  h2: {
    textAlign: "center",
  },
};
