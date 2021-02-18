import { Link } from "react-router-dom";
export const NoUsers = () => {
  return (
    <>
      <h3>No users here:(</h3>
      <Link to='/add-user'>create new user</Link>
    </>
  );
};
