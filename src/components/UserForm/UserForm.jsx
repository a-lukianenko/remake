import { useState, useRef, Children } from "react";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";

import { Account } from "./Account/Account";
import { formHeaders, validationSchema, initialValues } from "utils/formData";
import { Profile } from "./Profile/Profile";
import { Contacts } from "./Contacts/Contacts";
import { Capabilities } from "./Capabilities/Capabilities";
import { FormHeaders } from "../FormHeaders/FormHeaders";
import {
  form,
  formStep,
  buttons,
  btnBack,
  btnForward,
} from "./UserForm.module.css";
import { addUserAsync } from "features/users/usersSlice";
import { useDispatch } from "react-redux";

export const UserForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // to check notOneOf:
  // const usernames = ["one", "two"];
  // const emails = ["example@example.com", "gmail@gmail.com"];
  const formProps = {
    initialValues,
    onSubmit: async values => {
      const payload = {
        ...values,
        birthDate: new Date(values.birthDate).getTime(),
      };
      dispatch(addUserAsync(payload));
      history.push("/users");
    },
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
      onSubmit={async values => {
        isLastStep() ? await props.onSubmit(values) : stepForward();
      }}
    >
      <Form className={form} autoComplete='on' noValidate>
        <FormHeaders
          headers={formHeaders}
          step={step}
          touched={touched.current}
        />
        <div className={formStep}>{currentStep}</div>
        <div className={buttons}>
          {step > 0 ? (
            <button onClick={stepBack} type='button' className={btnBack}>
              Back
            </button>
          ) : null}

          <button
            type='submit'
            className={
              isLastStep() ? `${btnForward} accent-button` : btnForward
            }
          >
            {isLastStep() ? "Finish" : "Forward"}
          </button>
        </div>
      </Form>
    </Formik>
  );
};
