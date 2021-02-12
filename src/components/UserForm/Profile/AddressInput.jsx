import { useState } from "react";
import { useField } from "formik";
import PlacesAutocomplete from "react-places-autocomplete";

export const AddressInput = ({ label, id, ...props }) => {
  const [field, , helpers] = useField(props);
  const { setValue } = helpers;
  const { value, name } = field;
  const [address, setAddress] = useState(value || "");

  const handleChange = value => {
    setAddress(value);
    setValue(value);
  };

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleChange}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <label htmlFor={id}>{label}</label>
            <input
              {...getInputProps({
                id,
                name,
                ...props,
              })}
            />
            <div>
              {loading && <div>loading...</div>}
              {suggestions.map(suggestion => {
                const style = suggestion.active
                  ? { backgroundColor: "#bbe0f0", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };

                return (
                  <div
                    key={suggestion.description}
                    {...getSuggestionItemProps(suggestion, { style })}
                  >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};
