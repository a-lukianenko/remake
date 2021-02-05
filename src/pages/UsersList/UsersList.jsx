import { useSelector } from "react-redux";
import { NoUsers } from "./NoUsers";
import css from "./UsersList.module.css";

import { Link } from "react-router-dom";

export const UsersList = () => {
  const users = useSelector(state => state.users);

  const tableContent = users.map(user => {
    const { id, lastUpdate } = user,
      { username } = user.account,
      { firstName, lastName, email } = user.personalInfo,
      { company } = user.contactDetails;

    return (
      <tr key={id.toString()}>
        <td>
          <Link to={`users/${username}`}>
            {firstName} {lastName}
            <br />
            <small>{username}</small>
          </Link>
        </td>
        <td>{company}</td>
        <td>{email}</td>
        <td>{lastUpdate}</td>
        <td>
          <Link to={`/users/${username}/edit/account`}>&#9998;</Link>
          <button style={style.deleteBtn}>&#10006;</button>
        </td>
      </tr>
    );
  });

  return (
    <section className={css.UsersList}>
      <h2>List of users</h2>
      <table className='striped-table'>
        <thead>
          <tr>
            <th>name</th>
            <th>company</th>
            <th>contactDetails</th>
            <th>last update</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{tableContent || <NoUsers />}</tbody>
      </table>
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
