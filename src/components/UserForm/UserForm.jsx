import { useState, useRef, useEffect, Children, useMemo } from "react";
import { Form, useFormik, FormikProvider } from "formik";
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
  const getInitialValues = fallbackValue => {
    const values = JSON.parse(localStorage.getItem("values"));
    return values
      ? { ...values, birthDate: new Date(values.birthDate) }
      : fallbackValue;
  };

  const getValidationScema = useMemo(() => validationSchema({ step }), [step]);
  const formProps = {
    initialValues: getInitialValues(initialValues),
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
  const saveLocal = () => {
    localStorage.setItem("values", JSON.stringify(valuesRef.current));
  };

  const valuesRef = useRef(formik.values);
  useEffect(() => {
    valuesRef.current = formik.values;
  }, [formik.values]);

  useEffect(() => {
    document.addEventListener("onbeforeunload", saveLocal);
    return () => {
      saveLocal();
      document.removeEventListener("onbeforeunload", saveLocal);
    };
  }, []);

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
    <FormikProvider value={formik}>
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
