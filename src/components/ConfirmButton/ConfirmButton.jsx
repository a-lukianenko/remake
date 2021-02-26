import { deleteBtn, deleteBtnRed } from "./ConfirmButton.module.css";

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
