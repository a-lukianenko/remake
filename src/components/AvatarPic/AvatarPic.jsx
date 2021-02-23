import placeholder from "assets/img/user.svg";
import { avatarPic } from "./AvatarPic.module.css";

export const AvatarPic = ({
  src,
  alt = "avatar",
  width = "100",
  height = "100",
  style,
}) => {
  return (
    <img
      src={src || placeholder}
      alt={alt}
      width={width}
      height={height}
      className={avatarPic}
      style={style}
    />
  );
};
