import css from "./FormHeaders.module.css";

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
        let className;

        switch (true) {
          case isEditing && i !== step:
            className = `${css.h3} ${css.passed}`;
            break;
          case i < touched && i !== step:
            className = `${css.h3} ${css.passed}`;
            break;
          case i === step:
            className = `${css.h3} ${css.current}`;
            break;
          default:
            className = css.h3;
        }

        return (
          <h3
            key={header}
            className={className}
            onClick={isEditing ? () => handleStepNavigation(i) : null}
            style={isEditing && { cursor: "pointer" }}
          >
            {header}
          </h3>
        );
      })}
    </div>
  );
};
