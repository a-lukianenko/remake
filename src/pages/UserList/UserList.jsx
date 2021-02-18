import { useSelector } from "react-redux";
import { NoUsers } from "./NoUsers";
import { thead, userList, name } from "./UserList.module.css";

import { Link } from "react-router-dom";
import { selectAllUsers } from "features/users/usersSlice";
import { AvatarPic } from "components/AvatarPic/AvatarPic";

export const UsersList = () => {
  const users = useSelector(selectAllUsers) || [];

  const tableContent =
    users.length > 0
      ? users.map(user => {
          const {
            username,
            firstName,
            lastName,
            email,
            company,
            lastUpdate,
          } = user;

          return (
            <tr key={username}>
              <td>
                <AvatarPic
                  src={user.avatar}
                  width='70'
                  height='70'
                  style={{ display: "inline-block" }}
                />
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
                <button style={style.deleteBtn}>&#10006;</button>
              </td>
            </tr>
          );
        })
      : null;

  return (
    <section className={userList}>
      <h2>List of users</h2>
      <table className='striped-table'>
        <thead className={thead}>
          <tr>
            <th>name</th>
            <th>company</th>
            <th>contactDetails</th>
            <th>last update</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
      {users.length < 1 ? <NoUsers /> : null}
    </section>
  );
};

const style = {
  deleteBtn: {
    padding: 0,
    margin: 0,
    marginLeft: "1rem",
    border: "none",
    color: "#4e86e4",
    background: "none",
  },
};
