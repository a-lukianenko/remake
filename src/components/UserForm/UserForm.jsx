import { useState, useRef, useEffect, Children, useMemo } from "react";
import { useSelector } from "react-redux";
import { Form, useFormik, FormikProvider } from "formik";
import { useHistory } from "react-router-dom";
import isEqual from "lodash.isequal";

import { Account } from "./Account/Account";
import {
  formHeaders,
  validationSchema,
  //initialValuesFilled, for testing
  initialValues,
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
import {
  addUserAsync,
  selectAllUsers,
  updateUserAsync,
} from "features/users/usersSlice";
import { useDispatch } from "react-redux";
import { UnsavedData } from "components/Modals/UnsavedData/UnsavedData";

export const UserForm = ({ valuesToEdit, userKey }) => {
  return (
    <FormStepper valuesToEdit={valuesToEdit} userKey={userKey}>
      <Account isEditing={Boolean(valuesToEdit)} />
      <Profile />
      <Contacts />
      <Capabilities />
    </FormStepper>
  );
};

const FormStepper = ({ children, ...props }) => {
  const { valuesToEdit, userKey } = props;
  const users = useSelector(selectAllUsers);
  const usernames = useMemo(() => users.map(u => u.username), [users]);
  const emails = useMemo(() => users.map(u => u.email), [users]);
  const dispatch = useDispatch();
  const history = useHistory();
  const formEditStep = history.location.state?.formEditStep;

  const steps = Children.toArray(children);

  const getStorageValues = () => {
    const values = JSON.parse(localStorage.getItem("values"));
    return { ...values, birthDate: new Date(values.birthDate) };
  };

  const [continueForm, setContinueForm] = useState(() => {
    const initial = {
      ...initialValues,
      step: 0,
    };
    const storage = getStorageValues();
    if (!storage) return false;

    const isSymmetric = isEqual(getStorageValues(), initial);
    const showPrompt = Boolean(localStorage.getItem("values")) && isSymmetric;
    return !showPrompt;
  });

  const [step, setStep] = useState(() => {
    if (formEditStep || formEditStep === 0) return formEditStep;
    if (localStorage.getItem("values") && getStorageValues()?.step)
      return getStorageValues().step;

    return 0;
  });

  const currentStep = steps[step];

  const getInitialValues = () => {
    if (valuesToEdit)
      return { ...valuesToEdit, birthDate: new Date(valuesToEdit.birthDate) };

    const inStorage = localStorage.getItem("values");
    return inStorage ? getStorageValues() : initialValues;
  };

  const getValidationScema = useMemo(
    () =>
      validationSchema({
        usernames: valuesToEdit ? [] : usernames,
        emails: valuesToEdit ? [] : emails,
        step,
      }),
    [usernames, emails, step, valuesToEdit]
  );
  const formProps = {
    initialValues:
      continueForm && !valuesToEdit ? initialValues : getInitialValues(),
    enableReinitialize: true,
    validationSchema: getValidationScema,
    validateOnChange: false,
    onSubmit: async (values, actions) => {
      if (valuesToEdit) {
        const payload = {
          user: {
            ...values,
            birthDate: new Date(values.birthDate).getTime(),
            lastUpdate: Date.now(),
          },
          key: userKey,
          history,
        };

        dispatch(updateUserAsync(payload));
      } else if (isLastStep() && !valuesToEdit) {
        const payload = {
          ...values,
          birthDate: new Date(values.birthDate).getTime(),
        };
        dispatch(addUserAsync(payload));
        stepRef.current = 0;
        valuesRef.current = initialValues;
        localStorage.clear();
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
    setContinueForm(false);
    setStep(0);
  };
  const handleContinue = () => {
    const newStep = getStorageValues().step;
    setContinueForm(false);
    setStep(newStep);
    touched.current = newStep;
  };

  const valuesRef = useRef(formik.values);
  const stepRef = useRef(step);

  useEffect(() => {
    valuesRef.current = formik.values;
    stepRef.current = step;
  }, [formik.values, step]);

  const saveLocal = () => {
    localStorage.setItem(
      "values",
      JSON.stringify({ ...valuesRef.current, step: stepRef.current })
    );
  };

  useEffect(() => {
    !valuesToEdit && window.addEventListener("beforeunload", saveLocal);
    return () => {
      !valuesToEdit && saveLocal();
      window.removeEventListener("beforeunload", () => {});
    };
  }, [valuesToEdit]);

  const touched = useRef(0);

  const stepBack = () => setStep(step => step - 1);
  const stepForward = () => {
    setStep(step => {
      step + 1 > touched.current && touched.current++;
      return step + 1;
    });
  };
  const isLastStep = () => step === steps.length - 1;
  const toStep = step => {
    setStep(step);
  };

  return (
    <FormikProvider value={formik}>
      <Form className={form} autoComplete='on' noValidate>
        <FormHeaders
          headers={formHeaders}
          step={step}
          touched={touched.current}
          isEditing={Boolean(valuesToEdit)}
          handleStepNavigation={toStep}
        />
        {continueForm && !valuesToEdit && (
          <UnsavedData resetForm={handleReset} continueForm={handleContinue} />
        )}
        <div className={formStep}>{currentStep}</div>
        <div className={buttons}>
          {step > 0 && !valuesToEdit ? (
            <button onClick={stepBack} type='button' className={btnBack}>
              Back
            </button>
          ) : null}

          <button
            type='submit'
            className={
              isLastStep() && !valuesToEdit
                ? `${btnForward} accent-button`
                : btnForward
            }
          >
            {valuesToEdit && "Save"}
            {!valuesToEdit && !isLastStep() && "Forward"}
            {!valuesToEdit && isLastStep() && "Finish"}
          </button>
        </div>
      </Form>
    </FormikProvider>
  );
};
