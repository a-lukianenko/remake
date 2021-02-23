import { RadioInput } from "./RadioInput";
import { labels } from "./RadioInputGroup.module.css";

export const RadioInputGroup = ({ type, name, label, values }) => {
  return (
    <div>
      <label>{label}</label>
      <div className={labels}>
        {values.map(value => (
          <RadioInput key={value.value} type={type} name={name} value={value} />
        ))}
      </div>
    </div>
  );
};
