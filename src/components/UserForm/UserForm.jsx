import { useState, useRef, useEffect, Children, useMemo } from "react";
import { Form, useFormik, FormikProvider } from "formik";
import { useHistory, useLocation } from "react-router-dom";

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
import { addUserAsync, updateUserAsync } from "features/users/usersSlice";
import { useDispatch } from "react-redux";
import { UnsavedData } from "components/Modals/UnsavedData/UnsavedData";

export const UserForm = ({ initialValues, isEditing, dbKey }) => {
  return (
    <FormStepper
      initialValues={initialValues}
      isEditing={isEditing}
      dbKey={dbKey}
    >
      <Account isEditing={isEditing} />
      <Profile />
      <Contacts />
      <Capabilities />
    </FormStepper>
  );
};

const FormStepper = ({ children, ...props }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const formEditStep = history.location.state?.formEditStep || null;

  const steps = Children.toArray(children);
  const [isIncomplete, setIsIncomplete] = useState(
    () => Boolean(localStorage.getItem("values")) || false
  );
  const [step, setStep] = useState(() => {
    return (
      formEditStep ||
      (localStorage.getItem("values") &&
        JSON.parse(localStorage.getItem("values")).step) ||
      0
    );
  });

  const currentStep = steps[step];

  // TODO:  check notOneOf:
  // const usernames = ["one", "two"];
  // const emails = ["example@example.com", "gmail@gmail.com"];
  const getStorageValues = () => {
    const values = JSON.parse(localStorage.getItem("values"));
    return { ...values, birthDate: new Date(values.birthDate) };
  };

  const getInitialValues = () => {
    if (props.isEditing) {
      return props.initialValues;
    } else {
      return localStorage.getItem("values")
        ? getStorageValues()
        : initialValuesFilled;
    }
  };

  const getValidationScema = useMemo(() => validationSchema({ step }), [step]);
  const formProps = {
    initialValues: getInitialValues(),
    enableReinitialize: true,
    validationSchema: getValidationScema,
    onSubmit: async values => {
      if (props.isEditing) {
        const payload = {
          user: {
            ...values,
            birthDate: new Date(values.birthDate).getTime(),
            lastUpdate: Date.now(),
          },
          key: props.dbKey,
          history,
        };
        // localStorage.clear();
        // stepRef.current = 0;
        // valuesRef.current = initialValuesEmpty;
        dispatch(updateUserAsync(payload));
      } else if (isLastStep() && !props.isEditing) {
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

  const valuesRef = useRef(formik.values);
  const stepRef = useRef(step);
  const touchedRef = useRef(formik.touched);

  useEffect(() => {
    valuesRef.current = formik.values;
    stepRef.current = step;
    touchedRef.current = formik.touched;
  }, [formik.values, step, formik.touched]);

  const saveLocal = () => {
    // const isTouched = Object.keys(touchedRef.current) > 0;
    // if (isTouched)
    localStorage.setItem(
      "values",
      JSON.stringify({ ...valuesRef.current, step: stepRef.current })
    );
  };

  console.log(touchedRef.current);

  useEffect(() => {
    !props.isEditing && window.addEventListener("beforeunload", saveLocal);
    return () => {
      !props.isEditing && saveLocal();
      !props.isEditing && window.removeEventListener("beforeunload", saveLocal);
    };
  }, [props.isEditing]);

  const touched = useRef(0);

  const stepBack = () => setStep(step => step - 1);
  const stepForward = () => {
    setStep(step => {
      step + 1 > touched.current && touched.current++;
      return step + 1;
    });
  };
  const isLastStep = () => step === steps.length - 1;
  const handleStepNavigation = step => {
    setStep(step);
  };

  return (
    <FormikProvider value={formik}>
      <Form className={form} autoComplete='on' noValidate>
        <FormHeaders
          headers={formHeaders}
          step={step}
          touched={touched.current}
          isEditing={props.isEditing}
          handleStepNavigation={handleStepNavigation}
        />
        {isIncomplete && !props.isEditing && (
          <UnsavedData resetForm={handleReset} continueForm={handleContinue} />
        )}
        <div className={formStep}>{currentStep}</div>
        <div className={buttons}>
          {step > 0 && !props.isEditing ? (
            <button onClick={stepBack} type='button' className={btnBack}>
              Back
            </button>
          ) : null}

          <button
            type='submit'
            className={
              isLastStep() && !props.isEditing
                ? `${btnForward} accent-button`
                : btnForward
            }
          >
            {props.isEditing && "Save"}
            {!props.isEditing && !isLastStep() && "Forward"}
            {!props.isEditing && isLastStep() && "Finish"}
          </button>
        </div>
      </Form>
    </FormikProvider>
  );
};
