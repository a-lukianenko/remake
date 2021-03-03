import { useState } from "react";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { formatDistance } from "date-fns";

import { AvatarPic } from "components/AvatarPic/AvatarPic";
import { ConfirmButton } from "components/Buttons/ConfirmButton/ConfirmButton";

import {
  name,
  userName,
  row,
  rowShifted,
  whiteBackground,
} from "./UserRecord.module.css";
import { deleteUserAsync } from "features/users/usersSlice";
import { UserRecordType } from "types/types";

export const UserRecord = ({ user }) => {
  const [isDelete, setIsDelete] = useState(false);
  const dispatch = useDispatch();

  const {
    id,
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

  const deleteRecord = () => dispatch(deleteUserAsync(id));

  return (
    <tr className={isDelete ? rowShifted : row}>
      <td data-label='name'>
        <Link to={`users/${id}`} className={name}>
          <AvatarPic src={avatar} width='40' height='40' />
          <div>
            <span>
              {firstName} {lastName}
            </span>
            <br />
            <span className={userName}>{username}</span>
          </div>
        </Link>
      </td>
      <td data-label='company'>
        <span>{company}</span>
      </td>
      <td data-label='email'>{email}</td>
      <td data-label='last update'>
        {lastUpdate
          ? formatDistance(lastUpdate, Date.now(), {
              includeSeconds: true,
              addSuffix: true,
            })
          : `joined ${new Date().toLocaleDateString()}`}
      </td>
      <td className={isDelete ? whiteBackground : ""}>
        {!isDelete && (
          <Link
            to={{
              pathname: `/users/${id}/edit`,
              state: { formEditStep: 0 },
            }}
            title='edit'
            className='edit'
            style={{ color: "#B1BCC9" }}
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
          confirmTitle={`${String.fromCharCode(0x2716)}  delete`}
        />
      </td>
    </tr>
  );
};

UserRecord.propTypes = UserRecordType;
