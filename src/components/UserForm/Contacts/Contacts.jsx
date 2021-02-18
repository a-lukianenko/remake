import { useState } from "react";
import { TextInput } from "components/Inputs/TextInput/TextInput";
import { LanguageInput } from "components/Inputs/SelectInput/LanguageInput";
import { useFormikContext } from "formik";
import { TelInput } from "components/Inputs/TelInput/TelInput";
import { ReactComponent as Add } from "assets/img/add.svg";

export const Contacts = () => {
  const {
    values: { phone1, phone2, phone3 },
    setFieldValue,
  } = useFormikContext();

  const data = [phone1, phone2, phone3].map((phone, i) => ({
    [`phone${i + 1}`]: phone,
  }));

  const addPhoneInput = () => {
    if (phones.length < 3) {
      setPhones(_ => {
        const filled = data.filter((phone, i) => phone[`phone${i + 1}`]);
        const unfilled = data.filter((phone, i) => !phone[`phone${i + 1}`]);
        const [nextToAdd] = unfilled.sort(
          (prev, next) =>
            +Object.keys(prev)[0].split("e")[1] -
            +Object.keys(next)[0].split("e")[1]
        );
        return [...filled, nextToAdd];
      });
    }
  };

  const removePhone = name => {
    if (phones.length > 1) {
      setFieldValue([name], "");
      setPhones(phones.filter(phone => Object.keys(phone)[0] !== name));
    }
  };

  const dataFiltered = data.filter(phone => Object.values(phone)[0]);
  const initialValue = dataFiltered.length > 0 ? dataFiltered : [data[0]];
  const [phones, setPhones] = useState(initialValue);

  return (
    <div style={style.contacts}>
      <div>
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

        <LanguageInput id='language' name='language' label='Main language' />
      </div>
      <div>
        <TelInput id='fax' label='Fax' name='fax' type='tel' />
        {phones.map((phone, i) => (
          <TelInput
            key={i.toString()}
            label={`Phone #${i + 1}`}
            name={Object.keys(phone)[0]}
            removePhone={removePhone}
          />
        ))}

        {phones.length < 3 && (
          <button onClick={addPhoneInput} type='button' style={style.btn}>
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
