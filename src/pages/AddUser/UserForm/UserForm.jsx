import { useState, useRef, Children } from "react";
import { Formik, Form } from "formik";
import { Account } from "./Account/Account";
import { formHeaders, validationSchema, initialValues } from "utils/formData";
import { Profile } from "./Profile/Profile";
import { Contacts } from "./Contacts/Contacts";
import { Capabilities } from "./Capabilities/Capabilities";
import { FormHeaders } from "./FormHeaders/FormHeaders";

export const UserForm = () => {
  // to check notOneOf:
  // const usernames = ["one", "two"];
  // const emails = ["example@example.com", "gmail@gmail.com"];
  const formProps = {
    initialValues,
    onSubmit: async values => console.log(JSON.stringify(values, null, 2)),
  };

  return (
    <FormStepper {...formProps}>
      <Account validationSchema={validationSchema.account()} />
      <Profile validationSchema={validationSchema.profile()} />
      <Contacts validationSchema={validationSchema.contacts} />
      <Capabilities validationSchema={validationSchema.capabilities} />
    </FormStepper>
  );
};

const FormStepper = ({ children, ...props }) => {
  const steps = Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentStep = steps[step];

  const touched = useRef(0);

  const stepBack = () => setStep(step => step - 1);
  const stepForward = () => {
    setStep(step => {
      step + 1 > touched.current && touched.current++;
      return step + 1;
    });
  };
  const isLastStep = () => step === steps.length - 1;

  return (
    <Formik
      {...props}
      validationSchema={currentStep.props.validationSchema}
      onSubmit={async values =>
        isLastStep() ? await props.onSubmit(values) : stepForward()
      }
    >
      <Form style={style.form} autoComplete='on'>
        <FormHeaders
          headers={formHeaders}
          step={step}
          touched={touched.current}
        />
        <div style={style.step}>{currentStep}</div>
        <div style={style.btns}>
          {step > 0 ? (
            <button onClick={stepBack} type='button' style={style.btnBack}>
              Back
            </button>
          ) : null}

          <button
            type='submit'
            className={isLastStep() ? "accent-button" : ""}
            style={style.btnForward}
          >
            {isLastStep() ? "Finish" : "Forward"}
          </button>
        </div>
      </Form>
    </Formik>
  );
};

const style = {
  form: {
    margin: "2rem auto 6rem",
    width: "80%",
    padding: 0,
    background: "#E7F0FF",
  },
  step: {
    padding: "0 2rem",
  },
  btns: {
    textAlign: "right",
  },
  btnBack: {
    display: "inline-block",
    backgroundColor: "#C1CFE0",
  },
  btnForward: {
    marginLeft: "10px",
  },
};
