// import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { TextInput } from "./TextInput";
import validationSchema from "./validationSchema";

export const AddUser = () => {
  const formProps = {
    initialValues: { username: "", password: "", passwordRepeat: "" },
    validationSchema,
    onSubmit: async values => {
      console.log(JSON.stringify(values, null, 2));
    },
  };

  return (
    <section>
      <h2 style={style.h2}>Adding new user</h2>
      <Formik {...formProps}>
        <Form style={style.form}>
          <TextInput
            label='User name'
            type='text'
            id='username'
            name='username'
          />

          <TextInput
            label='Password'
            type='password'
            id='password'
            name='password'
            className='password-field'
          />

          <TextInput
            label='Repeat password'
            type='password'
            id='passwordRepeat'
            name='passwordRepeat'
            className='password-field'
          />

          <button type='submit' style={style.btn}>
            Forward
          </button>
        </Form>
      </Formik>
    </section>
  );
};

const style = {
  h2: {
    textAlign: "center",
  },
  form: {
    width: "50%",
    margin: "2rem auto 0",
  },
  btn: {
    display: "block",
    marginLeft: "auto",
  },
};
