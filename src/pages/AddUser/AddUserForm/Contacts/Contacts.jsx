import { useState } from "react";
import { TextInput } from "../TextInput";
import { FaxInput } from "./FaxInput";
import { LanguageInput } from "./LanguageInput";
import { PhoneInput } from "./PhoneInput/PhoneInput";
import { ReactComponent as Add } from "./add.svg";

export const Contacts = () => {
  const addPhone = () => {
    if (phones.length <= 3) {
      setPhones(phones => [
        ...phones,
        { type: "tel", name: `phone${phones.length + 1}` },
      ]);
    }
  };

  const removePhone = name => {
    phones.length > 1 &&
      setPhones(phones => phones.filter(phone => phone.name !== name));
  };

  const initialPhone = n => ({
    name: `phone${n}`,
    type: "tel",
  });

  const [phones, setPhones] = useState([initialPhone(1)]);

  return (
    <div style={style.contacts}>
      <div>
        <TextInput label='Company' type='text' id='company' name='company' />
        <TextInput label='Github link' type='text' id='github' name='github' />

        <TextInput
          label='Facebook link'
          type='text'
          id='facebook'
          name='facebook'
        />

        <LanguageInput />
      </div>
      <div>
        <FaxInput id='fax' label='Fax' name='fax' type='tel' />
        {phones.map((phoneProps, i) => (
          <PhoneInput
            key={i.toString()}
            label={`Phone #${i + 1}`}
            name={`phone${i + 1}`}
            removePhone={removePhone}
            {...phoneProps}
          />
        ))}

        {phones.length < 3 && (
          <button onClick={addPhone} type='button' style={style.btn}>
            <Add /> <span style={style.span}>add phone number</span>
          </button>
        )}
      </div>
    </div>
  );
};

const style = {
  contacts: {
    display: "flex",
    justifyContent: "space-between",
  },
  btn: {
    display: "block",
    marginTop: 10,
    border: "none",
    outline: "transparent",
    padding: 0,
    background: "none",
    color: "grey",
  },
  span: {
    verticalAlign: 3,
  },
};
