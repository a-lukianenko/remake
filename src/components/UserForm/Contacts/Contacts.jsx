import { useState } from "react";
import { useFormikContext } from "formik";
import { TextInput } from "components/Inputs/TextInput/TextInput";
import { SelectInput } from "components/Inputs/SelectInput/SelectInput";
import { TelInput } from "components/Inputs/TelInput/TelInput";
import { ReactComponent as Add } from "assets/img/add.svg";
import { languages } from "utils/formData";

import { container, contacts, btn, span } from "./Contacts.module.css";

export const Contacts = () => {
  const {
    values: { phone1, phone2, phone3 },
    setFieldValue,
  } = useFormikContext();

  const data = [phone1, phone2, phone3].map((phone, i) => ({
    [`phone${i + 1}`]: phone,
  }));

  const addPhoneInput = () => {
    setPhones(prev => {
      const present = prev.reduce(
        (acc, phone) => [...acc, ...Object.keys(phone)],
        []
      );
      const unfilled = data.filter(
        (phone, i) => !present.includes(Object.keys(phone)[0])
      );
      const [nextToAdd] = unfilled.sort(
        (prev, next) =>
          +Object.keys(prev)[0].split("e")[1] -
          +Object.keys(next)[0].split("e")[1]
      );
      return [...prev, nextToAdd];
    });
  };

  const removePhone = name => {
    setFieldValue([name], "");
    setPhones(phones.filter(phone => Object.keys(phone)[0] !== name));
  };

  const dataFiltered = data.filter(phone => Object.values(phone)[0]);
  const initialValue = dataFiltered.length > 0 ? dataFiltered : [data[0]];
  const [phones, setPhones] = useState(initialValue);

  return (
    <div className={contacts}>
      <div className={container}>
        <TextInput
          label='Company'
          type='text'
          id='company'
          name='company'
          required
        />
        <TextInput label='Github link' type='text' id='github' name='github' />

        <TextInput
          label='Facebook link'
          type='text'
          id='facebook'
          name='facebook'
        />

        <SelectInput
          id='languages'
          name='languages'
          label='Main language'
          placeholder={"Select a language"}
          selectOptions={languages}
          required
        />
      </div>
      <div className={container}>
        <TelInput id='fax' label='Fax' name='fax' type='tel' />
        {phones.map((phone, i) => (
          <TelInput
            key={i.toString()}
            label={`Phone #${i + 1}`}
            name={Object.keys(phone)[0]}
            removePhone={removePhone}
            isRemovable={phones.length > 1}
          />
        ))}

        {phones.length < 3 && (
          <button onClick={addPhoneInput} type='button' className={btn}>
            <Add /> <span className={span}>add phone number</span>
          </button>
        )}
      </div>
    </div>
  );
};
