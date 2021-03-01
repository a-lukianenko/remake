import { useState, useEffect } from "react";
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
  function getInnerWidth() {
    return window.innerWidth;
  }

  const [innerWidth, setInnerWidth] = useState(getInnerWidth());

  useEffect(() => {
    function handleResize() {
      setInnerWidth(getInnerWidth());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={css.formHeaders}>
      {headers.map((header, i) => {
        const className = cx("h3", {
          passed: (isEditing && i !== step) || (i < touched && i !== step),
          current: i === step,
          hidden: i !== step && innerWidth < 768,
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
