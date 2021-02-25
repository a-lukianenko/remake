import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useField } from "formik";
import { AvatarPic } from "components/AvatarPic/AvatarPic";
import {
  container,
  fileInput,
  label,
  avatarError,
} from "./AvatarInput.module.css";

export const AvatarInput = ({ name, avatarStyle }) => {
  const [field, meta, helpers] = useField(name);
  const { value } = field;
  const { setValue, setError } = helpers;

  const [avatarLabelName, setAvatarLabelName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(value);
  const [avatarBg, setAvatarBg] = useState(avatarStyle);

  useEffect(() => {
    setAvatarUrl(value);
  }, [value]);

  const onDrop = useCallback(
    acceptedFiles => {
      acceptedFiles.forEach(file => {
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
      });
    },
    [setError, setValue]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
    maxSize: 1_000_000,
    maxFiles: 1,
    multiple: false,
    onDragEnter: () =>
      setAvatarBg(prev => ({
        ...prev,
        opacity: 0.3,
      })),
    onDragLeave: () => setAvatarBg({ ...avatarStyle, opacity: 1 }),
    onDropAccepted: () => setAvatarBg({ ...avatarStyle, opacity: 1 }),
    onDropRejected: fileRejections => {
      const { errors, file } = fileRejections[0];
      setError(`${file.name}: \n ${errors[0].message}`);
      setAvatarUrl(null);
      setAvatarLabelName("");
      setAvatarBg({ ...avatarStyle, opacity: 1 });
      setTimeout(setError, 2000, null);
    },
  });

  return (
    <div
      className={container}
      {...getRootProps()}
      onClick={e => e.stopPropagation()}
    >
      <label htmlFor='avatar' className={label}>
        <AvatarPic
          src={avatarUrl}
          width='170px'
          height='170px'
          style={avatarBg}
        />
        {meta.error && <div className={avatarError}>{meta.error}</div>}
        <br />
        <span>{avatarLabelName}</span>

        <input
          className={fileInput}
          {...getInputProps()}
          id='avatar'
          name={name}
        />
        <p>+ add avatar</p>
      </label>
    </div>
  );
};
