import { useSelector } from "react-redux";

import { selectAllUsers } from "features/users/usersSlice";

import { NoUsers } from "./NoUsers";
import { UserRecord } from "./UserRecord/UserRecord";

import { thead, tbody, userList } from "./UserList.module.css";

export const UsersList = () => {
  const users = useSelector(selectAllUsers) || [];

  const tableContent =
    users.length > 0
      ? users.map(user => <UserRecord user={user} key={user.username} />)
      : null;

  return (
    <section className={userList}>
      <h2>List of users</h2>
      <table className='striped-table'>
        <thead className={thead}>
          <tr>
            <th style={{ paddingLeft: 80 }}>name</th>
            <th>company</th>
            <th>contacts</th>
            <th>last update</th>
            <th></th>
          </tr>
        </thead>
        <tbody className={tbody}>{tableContent}</tbody>
      </table>
      {!tableContent ? <NoUsers /> : null}
    </section>
  );
};
