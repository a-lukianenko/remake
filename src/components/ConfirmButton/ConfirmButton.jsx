import { useRef } from "react";
import { deleteBtn, deleteBtnRed } from "./ConfirmButton.module.css";

export const ConfirmButton = ({
  isConfirmed,
  title,
  confirmTitle,
  confirmAction,
  finalAction,
  cancelAction,
}) => {
  const buttonRef = useRef();
  return (
    <button
      ref={buttonRef}
      title={title}
      onClick={isConfirmed ? finalAction : confirmAction}
      onBlur={cancelAction}
      className={isConfirmed ? `${deleteBtn} ${deleteBtnRed}` : deleteBtn}
    >
      {isConfirmed ? confirmTitle : title}
    </button>
  );
};
