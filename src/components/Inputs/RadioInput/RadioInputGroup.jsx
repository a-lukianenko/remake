import { RadioInput } from "./RadioInput";
import { RadioInputGroupType } from "types/types";

export const RadioInputGroup = ({
  type,
  name,
  label,
  values,
  labelStyle,
  labelsStyle,
  inputStyle,
  labelWrapper,
}) => {
  return (
    <div>
      <label>{label}</label>
      <div className={labelsStyle}>
        {values.map(value => (
          <RadioInput
            key={value.value}
            type={type}
            name={name}
            value={value}
            labelStyle={labelStyle}
            inputStyle={inputStyle}
            labelWrapper={labelWrapper}
          />
        ))}
      </div>
    </div>
  );
};

RadioInputGroup.propTypes = RadioInputGroupType;
