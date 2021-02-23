import { useState } from "react";
import { useField } from "formik";
import { AvatarPic } from "components/AvatarPic/AvatarPic";
import { fileInput, label } from "./AvatarInput.module.css";

export const AvatarInput = ({ name, avatarStyle }) => {
  const [field, meta, helpers] = useField(name);
  const { setValue, setError } = helpers;

  const [avatarLabelName, setAvatarLabelName] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(field.value || "");

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
      <AvatarPic
        src={avatarUrl}
        width='100px'
        height='100px'
        style={avatarStyle}
      />

      {meta.error && <div className='error'>{meta.error}</div>}

      <label htmlFor='avatar' className={label}>
        + add avatar
      </label>

      <span>{avatarLabelName}</span>

      <input
        className={fileInput}
        onChange={handleFiles}
        type='file'
        id='avatar'
        name={name}
        accept='image/png, image/jpeg'
      />
    </div>
  );
};
