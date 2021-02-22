import { useState, useRef, useEffect, Children, useMemo } from "react";
import { Form, useFormik, FormikProvider } from "formik";
import { useHistory } from "react-router-dom";

import { Account } from "./Account/Account";
import {
  formHeaders,
  validationSchema,
  initialValuesFilled,
  initialValuesEmpty,
} from "utils/formData";
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
import { UnsavedData } from "components/Modals/UnsavedData/UnsavedData";

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
  const [isForIncomplete, setIsIncomplete] = useState(
    () => Boolean(localStorage.getItem("values")) || false
  );
  const [step, setStep] = useState(() => {
    return (
      (localStorage.getItem("values") &&
        JSON.parse(localStorage.getItem("values")).step) ||
      0
    );
  });

  const currentStep = steps[step];
  const dispatch = useDispatch();
  const history = useHistory();

  // to check notOneOf:
  // const usernames = ["one", "two"];
  // const emails = ["example@example.com", "gmail@gmail.com"];
  const getInitialValues = () => {
    const values = JSON.parse(localStorage.getItem("values"));
    return { ...values, birthDate: new Date(values.birthDate) };
  };

  const getValidationScema = useMemo(() => validationSchema({ step }), [step]);
  const formProps = {
    initialValues: localStorage.getItem("values")
      ? getInitialValues()
      : initialValuesFilled,
    enableReinitialize: true,
    validationSchema: getValidationScema,
    onSubmit: async values => {
      if (isLastStep()) {
        const payload = {
          ...values,
          birthDate: new Date(values.birthDate).getTime(),
        };
        dispatch(addUserAsync(payload));
        localStorage.clear();
        stepRef.current = 0;
        valuesRef.current = initialValuesEmpty;
        history.push("/users");
      } else {
        stepForward();
      }
    },
  };

  const formik = useFormik(formProps);
  const handleReset = () => {
    formik.resetForm();
    localStorage.clear();
    setIsIncomplete(false);
    setStep(0);
  };
  const handleContinue = () => {
    setIsIncomplete(false);
  };

  const saveLocal = () => {
    localStorage.setItem(
      "values",
      JSON.stringify({ ...valuesRef.current, step: stepRef.current })
    );
  };

  const valuesRef = useRef(formik.values);
  const stepRef = useRef(step);
  useEffect(() => {
    valuesRef.current = formik.values;
    stepRef.current = step;
  }, [formik.values, step]);

  useEffect(() => {
    window.addEventListener("beforeunload", saveLocal);
    return () => {
      saveLocal();
      window.removeEventListener("beforeunload", saveLocal);
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
        {isForIncomplete && (
          <UnsavedData resetForm={handleReset} continueForm={handleContinue} />
        )}
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
