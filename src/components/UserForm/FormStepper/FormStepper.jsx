import { useState, useRef, useEffect, Children, useMemo } from "react";
import { useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { Form, useFormik, FormikProvider } from "formik";
import { useHistory } from "react-router-dom";
import isEqual from "lodash.isequal";
import classNames from "classnames/bind";

import {
  formHeaders,
  getStorageValues,
  getValidationSchema,
  initialValues,
} from "utils/formData";

import { FormHeaders } from "components/FormHeaders/FormHeaders";
import {
  form,
  formStep,
  buttons,
  btnBack,
  btnForward,
} from "./FormStepper.module.css";

import {
  addUserAsync,
  selectAllEmails,
  selectAllUsernames,
  updateUserAsync,
} from "features/users/usersSlice";

import { useDispatch } from "react-redux";
import { UnsavedData } from "components/Modals/UnsavedData/UnsavedData";
import { FormStepperType } from "types/types";

export const FormStepper = ({ children, valuesToEdit, userId }) => {
  const { usernames, emails } = useSelector(mapStateToProps);

  const dispatch = useDispatch();
  const history = useHistory();
  const formEditStep = history.location.state?.formEditStep;

  const steps = Children.toArray(children);

  const [continueForm, setContinueForm] = useState(
    () => !isEqual(getStorageValues(), initialValues)
  );

  const [step, setStep] = useState(() =>
    formEditStep || formEditStep === 0 ? formEditStep : 0
  );

  const currentStep = steps[step];

  const getInitialValues = () => {
    if (valuesToEdit)
      return { ...valuesToEdit, birthDate: new Date(valuesToEdit.birthDate) };

    return getStorageValues();
  };

  const validationSchema = getValidationSchema({
    usernames,
    emails,
    step,
  });

  const formik = useFormik({
    initialValues:
      continueForm && !valuesToEdit ? initialValues : getInitialValues(),
    enableReinitialize: true,
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values, actions) => {
      if (valuesToEdit) {
        const payload = {
          user: {
            ...values,
            birthDate: new Date(values.birthDate).getTime(),
            lastUpdate: Date.now(),
          },
          userId,
          history,
        };

        dispatch(updateUserAsync(payload));
      } else if (isLastStep() && !valuesToEdit) {
        const { step, ...valid } = values;
        const payload = {
          ...valid,
          birthDate: new Date(values.birthDate).getTime(),
          id: nanoid(),
        };
        dispatch(addUserAsync(payload));
        stepRef.current = 0;
        valuesRef.current = null;
        localStorage.clear();
        history.push("/users");
      } else {
        stepForward();
      }
    },
  });

  const handleReset = () => {
    formik.resetForm();
    localStorage.clear();
    setContinueForm(false);
    setStep(0);
  };
  const handleContinue = () => {
    const newStep = JSON.parse(localStorage.getItem("values"))?.step || 0;
    setContinueForm(false);
    formik.setValues(getStorageValues(), true);

    setStep(newStep);
    touched.current = newStep;
  };

  const valuesRef = useRef(formik.values);
  const stepRef = useRef(step);

  useEffect(() => {
    valuesRef.current = isEqual(formik.values, initialValues)
      ? null
      : formik.values;
    stepRef.current = step;
  }, [formik.values, step]);

  useEffect(() => {
    const saveLocal = () => {
      valuesRef.current &&
        localStorage.setItem(
          "values",
          JSON.stringify({ ...valuesRef.current, step: stepRef.current })
        );
      valuesRef.current = null;
    };

    !valuesToEdit &&
      window.addEventListener("beforeunload", saveLocal, { once: true });
    return () => {
      !valuesToEdit && valuesRef.current && saveLocal();
    };
  }, [valuesToEdit]);

  const touched = useRef(0);

  const stepBack = () => setStep(step => step - 1);
  const stepForward = () => {
    setStep(step => {
      step + 1 > touched.current && touched.current++;
      return step + 1;
    });
    formik.setTouched({});
  };
  const isLastStep = () => step === steps.length - 1;
  const toStep = step => formik.isValid && setStep(step);

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
            className={classNames(btnForward, {
              "accent-button": isLastStep() && !valuesToEdit,
            })}
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

FormStepper.propTypes = FormStepperType;

const mapStateToProps = state => ({
  usernames: selectAllUsernames(state),
  emails: selectAllEmails(state),
});
