import { Link } from "react-router-dom";
import { AvatarPic } from "components/AvatarPic/AvatarPic";
import { name, deleteBtn } from "./UserRecord.module.css";

export const UserRecord = ({ user }) => {
  const { username, firstName, lastName, company, email, lastUpdate } = user;

  return (
    <tr>
      <td>
        <AvatarPic src={user.avatar} width='70' height='70' />
        <Link to={`users/${username}`} className={name}>
          {firstName} {lastName}
          <br />
          <small>{username}</small>
        </Link>
      </td>
      <td>{company}</td>
      <td>{email}</td>
      <td>{lastUpdate || "TODO"}</td>
      <td>
        <Link to={`/users/${username}/edit/account`}>&#9998;</Link>
        <button className={deleteBtn}>&#10006;</button>
      </td>
    </tr>
  );
};
