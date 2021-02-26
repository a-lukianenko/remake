import classNames from "classnames/bind";
import css from "./FormHeaders.module.css";

const cx = classNames.bind(css);

export const FormHeaders = ({
  headers,
  step,
  touched,
  isEditing,
  handleStepNavigation,
}) => {
  return (
    <div className={css.formHeaders}>
      {headers.map((header, i) => {
        const className = cx("h3", {
          passed: (isEditing && i !== step) || (i < touched && i !== step),
          current: i === step,
        });

        return (
          <h3
            key={header}
            className={className}
            onClick={isEditing ? () => handleStepNavigation(i) : null}
            style={isEditing ? { cursor: "pointer" } : null}
          >
            {header}
          </h3>
        );
      })}
    </div>
  );
};
