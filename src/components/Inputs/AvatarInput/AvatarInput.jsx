import { useState } from "react";
import { useField } from "formik";
import { AvatarPic } from "components/AvatarPic/AvatarPic";
import { container, fileInput, label } from "./AvatarInput.module.css";

export const AvatarInput = ({ name, avatarStyle }) => {
  const [field, meta, helpers] = useField(name);
  const { setValue, setError } = helpers;

  const [avatarLabelName, setAvatarLabelName] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(field.value || "");

  const handleFiles = e => {
    const file = e.target.files[0];
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
    <div className={container}>
      <label htmlFor='avatar' className={label}>
        <AvatarPic
          src={avatarUrl}
          width='170px'
          height='170px'
          style={avatarStyle}
        />
        {meta.error && <div className='error'>{meta.error}</div>}
        <br />
        <span>+ add avatar</span>
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
