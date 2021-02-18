import { Field } from "formik";

export const Hobbies = ({ label, id, name }) => {
  return (
    <div role='group' aria-labelledby={id}>
      <label id={id}>{label}</label>
      <label>
        <Field type='checkbox' name={name} value='art' />
        Art
      </label>
      <label>
        <Field type='checkbox' name={name} value='sports' />
        Sport, fitness, aerobica and staff like that
      </label>
      <label>
        <Field type='checkbox' name={name} value='games' />I just want to play
        games, I’m not living in this life
      </label>
      <label>
        <Field type='checkbox' name={name} value='nothing' />
        I’m a female... I’m doing nothing. Every day.
      </label>
      <label>
        <Field type='checkbox' name={name} value='guitar' />
        Guitar, guitar and guitar again. I’m in love with it.
      </label>
      <label>
        <Field type='checkbox' name={name} value='wtf' />
        WTF is “hobbies”???
      </label>
    </div>
  );
};
