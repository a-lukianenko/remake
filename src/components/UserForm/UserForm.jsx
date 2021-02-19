import { useState, useRef, useEffect, Children, useMemo } from "react";
import { Formik, Form, useFormik, FormikProvider } from "formik";
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
  // const dispatch = useDispatch();
  // const history = useHistory();
  // // to check notOneOf:
  // // const usernames = ["one", "two"];
  // // const emails = ["example@example.com", "gmail@gmail.com"];
  // const formProps = {
  //   initialValues: JSON.parse(localStorage.getItem("values")) || initialValues,
  //   enableReinitialize: true,
  //   validationSchema: validationSchema[step]
  //   onSubmit: async values => {
  //     const payload = {
  //       ...values,
  //       birthDate: new Date(values.birthDate).getTime(),
  //     };
  //     dispatch(addUserAsync(payload));
  //     history.push("/users");
  //   },
  // };

  // const saveLocal = payload =>
  //   localStorage.setItem("values", JSON.stringify(payload));

  // useEffect(() => {
  //   document.addEventListener("beforeunload", () => saveLocal());
  // });

  return (
    <FormStepper>
      <Account />
      <Profile />
      <Contacts />
      <Capabilities />
    </FormStepper>
  );
};

const FormStepper = ({ children }) => {
  const steps = Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentStep = steps[step];
  const dispatch = useDispatch();
  const history = useHistory();
  // to check notOneOf:
  // const usernames = ["one", "two"];
  // const emails = ["example@example.com", "gmail@gmail.com"];
  const getValidationScema = useMemo(() => validationSchema(step), [step]);
  const formProps = {
    initialValues: JSON.parse(localStorage.getItem("values")) || initialValues,
    enableReinitialize: true,
    validationSchema: getValidationScema,
    onSubmit: async values => {
      if (isLastStep()) {
        const payload = {
          ...values,
          birthDate: new Date(values.birthDate).getTime(),
        };
        dispatch(addUserAsync(payload));
        history.push("/users");
      } else {
        stepForward();
      }
    },
  };

  const formik = useFormik(formProps);
  console.log("validation", formProps);

  const saveLocal = payload =>
    localStorage.setItem("values", JSON.stringify(payload));

  useEffect(() => {
    document.addEventListener("beforeunload", () => saveLocal());
  });

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
    <FormikProvider
      value={formik}
      // {...props}
      // validationSchema={currentStep.props.validationSchema}
      // onSubmit={async values => {
      //   isLastStep() ? await props.onSubmit(values) : stepForward();
      // }}
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
    </FormikProvider>
  );
};
