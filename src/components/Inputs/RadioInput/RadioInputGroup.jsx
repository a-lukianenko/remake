import { RadioInput } from "./RadioInput";

export const RadioInputGroup = ({ type, name, label, values }) => {
  return (
    <div>
      <label>{label}</label>
      {values.map(value => (
        <RadioInput key={value.value} type={type} name={name} value={value} />
      ))}
    </div>
  );
};
