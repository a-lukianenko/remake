import { modal, continueBtn, reset } from "./UnsavedData.module.css";

export const UnsavedData = ({ closeModal, handleReset }) => {
  return (
    <div className={modal}>
      You have an unsaved user data. Do you want to complete it?
      <button type='button' className={continueBtn} onClick={closeModal}>
        Continue
      </button>
      <button type='button' className={reset} onClick={handleReset}>
        &times;
      </button>
    </div>
  );
};
