import { Field } from "formik";

export const Hobbies = () => {
  return (
    <div role='group' aria-labelledby='checkbox-group'>
      <label>My hobbies</label>
      <label>
        <Field type='checkbox' name='hobbies' value='art' />
        Art
      </label>
      <label>
        <Field type='checkbox' name='hobbies' value='sports' />
        Sport, fitness, aerobica and staff like that
      </label>
      <label>
        <Field type='checkbox' name='hobbies' value='games' />I just want to
        play games, I’m not living in this life
      </label>
      <label>
        <Field type='checkbox' name='hobbies' value='nothing' />
        I’m a female... I’m doing nothing. Every day.
      </label>
      <label>
        <Field type='checkbox' name='hobbies' value='guitar' />
        Guitar, guitar and guitar again. I’m in love with it.
      </label>
      <label>
        <Field type='checkbox' name='hobbies' value='wtf' />
        WTF is “hobbies”???
      </label>
    </div>
  );
};
