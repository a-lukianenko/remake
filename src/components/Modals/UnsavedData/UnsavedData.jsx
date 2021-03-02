import { UnsavedDataType } from "types/types";
import { modal, continueBtn, reset } from "./UnsavedData.module.css";

export const UnsavedData = ({ continueForm, resetForm }) => {
  return (
    <div className={modal}>
      You have an unsaved user data. Do you want to complete it?
      <button type='button' className={continueBtn} onClick={continueForm}>
        Continue
      </button>
      <button type='reset' className={reset} onClick={resetForm}>
        &times;
      </button>
    </div>
  );
};

UnsavedData.propTypes = UnsavedDataType;
