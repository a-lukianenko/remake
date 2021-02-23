import { useState } from "react";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { formatDistance } from "date-fns";

import { AvatarPic } from "components/AvatarPic/AvatarPic";
import { ConfirmButton } from "components/ConfirmButton/ConfirmButton";

import {
  name,
  cell,
  cellShifted,
  whiteBackground,
} from "./UserRecord.module.css";
import { deleteUserAsync } from "features/users/usersSlice";

export const UserRecord = ({ user }) => {
  const [isDelete, setIsDelete] = useState(false);
  const dispatch = useDispatch();

  const {
    username,
    avatar,
    firstName,
    lastName,
    company,
    email,
    lastUpdate,
  } = user;

  const confirmDelete = () => {
    setIsDelete(true);
  };

  const cancelDelete = () => {
    setIsDelete(false);
  };

  const deleteRecord = () => dispatch(deleteUserAsync(username));

  return (
    <tr className={isDelete ? cellShifted : cell}>
      <td>
        <AvatarPic src={avatar} width='70' height='70' />
        <Link to={`users/${username}`} className={name}>
          {firstName} {lastName}
          <br />
          <small>{username}</small>
        </Link>
      </td>
      <td>{company}</td>
      <td>{email}</td>
      <td>
        {formatDistance(lastUpdate, Date.now(), {
          includeSeconds: true,
          addSuffix: true,
        })}
      </td>
      <td className={isDelete ? whiteBackground : ""}>
        {!isDelete && (
          <Link
            to={{
              pathname: `/users/${username}/edit`,
              state: { formEditStep: 0 },
            }}
            title='edit'
          >
            &#9998;
          </Link>
        )}

        <ConfirmButton
          isConfirmed={isDelete}
          confirmAction={confirmDelete}
          finalAction={deleteRecord}
          cancelAction={cancelDelete}
          title={String.fromCharCode(0x2716)}
          confirmTitle={`${String.fromCharCode(0x2716)} delete`}
        />
      </td>
    </tr>
  );
};
