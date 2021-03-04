import { useState } from "react";
import { useSelector } from "react-redux";

import Pagination from "react-js-pagination";

import { selectAllUsers, selectIsLoading } from "features/users/usersSlice";

import { NoUsers } from "./NoUser/NoUsers";
import { UserRecord } from "./UserRecord/UserRecord";

import {
  table,
  thead,
  tbody,
  h2,
  pagination,
  paginationItem,
  paginationItemActive,
} from "./UserList.module.css";
import { Loader } from "components/Loader/Loader";
import { SearchInput } from "components/Inputs/SearchInput/SearchInput";
import { GenerateAccountsBtn } from "components/Buttons/GenerateAccountsBtn/GenerateAccountsBtn";

export const UsersList = () => {
  const users = useSelector(selectAllUsers);
  const isLoading = useSelector(selectIsLoading);

  const [activePage, setActivePage] = useState(0);

  const handlePageChange = pageNumber => {
    setActivePage(pageNumber);
  };

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
          .slice(5 * activePage, 5 * (activePage + 1))
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
        activePage={activePage}
        itemsCountPerPage={5}
        totalItemsCount={users.length}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        innerClass={pagination}
        itemClass={paginationItem}
        activeClass={paginationItemActive}
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
