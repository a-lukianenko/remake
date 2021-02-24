import { useSelector } from "react-redux";

import { selectAllUsers } from "features/users/usersSlice";

import { NoUsers } from "./NoUsers";
import { UserRecord } from "./UserRecord/UserRecord";

import { thead, tbody, h2 } from "./UserList.module.css";

export const UsersList = () => {
  const users = useSelector(selectAllUsers) || [];

  const tableContent =
    users.length > 0
      ? users.map(user => <UserRecord user={user} key={user.username} />)
      : null;

  // TODO: extract H2 into a component
  return (
    <section>
      <h2 className={h2}>List of users</h2>
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
