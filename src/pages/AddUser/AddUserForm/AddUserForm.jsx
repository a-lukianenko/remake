import { useState, Children } from "react";
import { Formik, Form } from "formik";
import { Account } from "./Account/Account";
import validate from "./validate";
import { Profile } from "./Profile/Profile";
import { Contacts } from "./Contacts/Contacts";
import { Capabilities } from "./Capabilities/Capabilities";

export const AddUserForm = () => {
  const usernames = ["one", "two"];
  const emails = ["example@example.com", "gmail@gmail.com"];
  const formProps = {
    initialValues: {
      username: "",
      password: "",
      passwordRepeat: "",
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      gender: "male",
      birthDate: "",
      company: "",
      github: "",
      facebook: "",
      fax: "",
      phone1: "",
      phone2: "",
      phone3: "",
      skils: [],
      additionalInfo: "",
      hobbies: [],
    },
    validationSchema: validate(usernames, emails),
    onSubmit: async values => {
      console.log(JSON.stringify(values, null, 2));
    },
  };

  return (
    <FormStepper {...formProps}>
      <Account />
      <Profile />
      <Contacts />
      <Capabilities />
    </FormStepper>
  );
};

const FormStepper = ({ children, ...props }) => {
  const steps = Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentStep = steps[step];

  const stepBack = () => {
    setStep(currentStep => currentStep - 1);
  };

  const stepForward = () => {
    setStep(currentStep => currentStep + 1);
  };

  return (
    <Formik {...props}>
      <Form style={style.form} autoComplete='on'>
        {currentStep}

        <div style={style.btns}>
          {step > 0 ? (
            <button onClick={stepBack} type='button' style={style.btn}>
              Back
            </button>
          ) : null}
          {step < steps.length - 1 ? (
            <button
              onClick={stepForward}
              type='button'
              style={style.btnForward}
            >
              Forward
            </button>
          ) : null}
          {step === steps.length - 1 ? (
            <button
              type='submit'
              className='accent-button'
              style={style.btnForward}
            >
              Finish
            </button>
          ) : null}
        </div>
      </Form>
    </Formik>
  );
};

const style = {
  form: {
    padding: "0 10rem",
    margin: "2rem auto 0",
  },
  btns: {
    textAlign: "right",
  },
  btn: {
    display: "inline-block",
  },
  btnForward: {
    marginLeft: "10px",
  },
};
