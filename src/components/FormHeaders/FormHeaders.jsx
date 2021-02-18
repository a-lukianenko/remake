import css from "./FormHeaders.module.css";

export const FormHeaders = ({ headers, step, touched }) => {
  return (
    <div className={css.formHeaders}>
      {headers.map((header, i) => {
        let className;

        switch (true) {
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
          <h3 key={header} className={className}>
            {header}
          </h3>
        );
      })}
    </div>
  );
};
