import user from "assets/img/user.svg";
import { avatarPic } from "./AvatarPic.module.css";

export const AvatarPic = ({
  src = user,
  alt = "avatar",
  width = "100",
  height = "100",
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={avatarPic}
    />
  );
};
