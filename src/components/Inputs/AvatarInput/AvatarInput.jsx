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
import { AvatarInputType } from "types/types";

export const AvatarInput = ({ name, hasBorder }) => {
  const [{ value }, { error }, { setValue, setError }] = useField(name);

  const avatarInitialData = { labelName: "", url: value };

  const [avatarData, setAvatarData] = useState(avatarInitialData);
  const [avatarBg, setAvatarBg] = useState(() =>
    hasBorder ? { border: "3px solid #5E97F3", padding: 5 } : null
  );

  useEffect(() => {
    setAvatarData(prev => ({ ...prev, url: value }));
  }, [value]);

  const onDrop = useCallback(
    acceptedFiles => {
      acceptedFiles.forEach(file => {
        if (file.size > 1_000_000)
          return setError(
            `File size (${file.size / 1_000_000}) is bigger than 1 MB.`
          );

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function () {
          const dataUrl = reader.result;
          setAvatarData({ labelName: file.name, url: dataUrl });
          setValue(dataUrl);
        };
        reader.onerror = function () {
          setAvatarData(prev => ({
            ...prev,
            labelName: "error occurred. Please, try again later",
          }));
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
    onDragLeave: () => setAvatarBg(prev => ({ ...prev, opacity: 1 })),
    onDropAccepted: () => setAvatarBg(prev => ({ ...prev, opacity: 1 })),
    onDropRejected: fileRejections => {
      const { errors, file } = fileRejections[0];
      fileRejections.length > 0
        ? setError(`${errors[0].message}`)
        : setError(`${file.name}: \n ${errors[0].message}`);

      setAvatarData(avatarInitialData);

      setAvatarBg(prev => ({ ...prev, opacity: 1 }));
      setTimeout(setError, 2_500, null);
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
          src={avatarData.url}
          width='170px'
          height='170px'
          style={avatarBg}
        />
        {error && <div className={avatarError}>{error}</div>}
        <br />
        <span>{avatarData.labelName}</span>

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

AvatarInput.propTypes = AvatarInputType;
