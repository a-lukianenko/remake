import { useState } from "react";
import { useField } from "formik";
import user from "./user.svg";

export const Avatar = ({ name }) => {
  const [field, meta, helpers] = useField(name);
  const { setValue, setError } = helpers;

  const [avatarLabelName, setAvatarLabelName] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(field.value || user);

  const handleFiles = e => {
    const file = e.target.files[0];
    // const tooBig = 2_000_000;
    if (file.size > 1_000_000)
      return setError(
        `File size (${file.size / 1_000_000}) is bigger than 1 MB.`
      );

    setAvatarLabelName(file.name);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
      const dataUrl = reader.result;
      setAvatarUrl(dataUrl);
      setValue(dataUrl);
    };
    reader.onerror = function () {
      setAvatarLabelName("error occurred. Please, try again later");
    };
  };

  return (
    <div>
      <img
        src={avatarUrl}
        alt='avatar'
        style={style.avatar}
        width='100px'
        height='100px'
      />
      {meta.error && <div className='error'>{meta.error}</div>}
      <label htmlFor='avatar' style={style.label}>
        + add avatar
      </label>
      <span>{avatarLabelName}</span>
      <input
        style={style.fileInput}
        onChange={handleFiles}
        type='file'
        id='avatar'
        name={name}
        accept='image/png, image/jpeg'
      />
    </div>
  );
};

const style = {
  avatar: {
    display: "block",
    width: 100,
    height: 100,
    border: "2px solid blue",
    borderRadius: "50%",
  },
  fileInput: {
    position: "absolute",
    height: 1,
    width: 1,
    overflow: "hidden",
    clip: "rect(1px, 1px, 1px, 1px)",
  },
  label: {
    display: "inline-block",
    marginRight: 10,
    cursor: "pointer",
  },
};
