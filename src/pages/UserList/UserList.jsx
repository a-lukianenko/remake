import { useSelector } from "react-redux";

import { selectAllUsers, selectIsLoading } from "features/users/usersSlice";

import { NoUsers } from "./NoUser/NoUsers";
import { UserRecord } from "./UserRecord/UserRecord";

import { thead, tbody, h2 } from "./UserList.module.css";
import { Loader } from "components/Loader/Loader";

export const UsersList = () => {
  const users = useSelector(selectAllUsers);
  const isLoading = useSelector(selectIsLoading);

  const tableContent =
    users?.length > 0
      ? users.map(user => <UserRecord user={user} key={user.username} />)
      : users;

  if (isLoading)
    return (
      <section>
        <h2 className={h2}>List of users</h2>
        <Loader />
      </section>
    );

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
      {!tableContent.length && <NoUsers />}
    </section>
  );
};
