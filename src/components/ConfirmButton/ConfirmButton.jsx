import { deleteBtn, deleteBtnRed } from "./ConfirmButton.module.css";
import { ConfirmButtonType } from "types/types";

export const ConfirmButton = ({
  isConfirmed,
  title,
  confirmTitle,
  confirmAction,
  finalAction,
  cancelAction,
}) => {
  return (
    <button
      title={title}
      onClick={isConfirmed ? finalAction : confirmAction}
      onBlur={cancelAction}
      className={isConfirmed ? `${deleteBtn} ${deleteBtnRed}` : deleteBtn}
    >
      {isConfirmed ? confirmTitle : title}
    </button>
  );
};

ConfirmButton.propTypes = ConfirmButtonType;
