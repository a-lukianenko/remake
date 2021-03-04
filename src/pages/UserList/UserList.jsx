import { useState } from "react";
import { useSelector } from "react-redux";

import { selectAllUsers, selectIsLoading } from "features/users/usersSlice";

import { NoUsers } from "./NoUser/NoUsers";
import { UserRecord } from "./UserRecord/UserRecord";

import { table, thead, tbody, h2 } from "./UserList.module.css";
import { Loader } from "components/Loader/Loader";
import { SearchInput } from "components/Inputs/SearchInput/SearchInput";
import { GenerateAccountsBtn } from "components/Buttons/GenerateAccountsBtn/GenerateAccountsBtn";
import { Pagination } from "components/Pagination/Pagination";

export const UsersList = () => {
  const users = useSelector(selectAllUsers);
  const isLoading = useSelector(selectIsLoading);

  const [page, setPage] = useState(0);

  const handlePrev = () => setPage(page => page > 0 && page - 1);
  const handleNext = () =>
    setPage(page => page < Math.trunc(users.length / 5) && page + 1);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = e => setSearchTerm(e.target.value.trim());

  const usersToDisplay = users.filter(
    ({ firstName, lastName }) =>
      firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log({ usersToDisplay });

  const tableContent =
    usersToDisplay?.length > 0
      ? usersToDisplay
          .map(user => <UserRecord user={user} key={user.id} />)
          .slice(5 * page, 5 * (page + 1))
      : usersToDisplay;

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
      <SearchInput searchTerm={searchTerm} onSearch={handleSearch} />
      <Pagination
        count={usersToDisplay.length}
        current={page}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <table className={`${table} striped-table`}>
        <thead className={thead}>
          <tr>
            <th style={{ paddingLeft: 80 }}>name</th>
            <th>company</th>
            <th>contacts</th>
            <th>last update</th>
            <th />
          </tr>
        </thead>
        <tbody className={tbody}>{tableContent}</tbody>
      </table>
      {!tableContent.length && <NoUsers />}
      <GenerateAccountsBtn />
    </section>
  );
};
