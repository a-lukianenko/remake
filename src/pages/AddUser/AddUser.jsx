import { UserForm } from "components/UserForm/UserForm";

export const AddUser = () => {
  return (
    <section>
      <h2 style={style.h2}>Adding new user</h2>
      <UserForm />
    </section>
  );
};

const style = {
  h2: {
    textAlign: "center",
  },
};
