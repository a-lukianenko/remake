import "./ConfirmButton.css";
import { ConfirmButtonType } from "types/types";
import classNames from "classnames";

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
      className={classNames("deleteBtn", { deleteBtnRed: isConfirmed })}
    >
      {isConfirmed ? confirmTitle : title}
    </button>
  );
};

ConfirmButton.propTypes = ConfirmButtonType;
