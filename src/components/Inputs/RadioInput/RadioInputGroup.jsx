import { RadioInput } from "./RadioInput";

export const RadioInputGroup = ({ type, name, values }) => {
  return (
    <div>
      {values.map(value => (
        <RadioInput key={value} type={type} name={name} value={value} />
      ))}
    </div>
  );
};
