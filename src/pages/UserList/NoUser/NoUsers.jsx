import { Link } from "react-router-dom";
import { container, h3, link } from "./NoUsers.module.css";

export const NoUsers = () => {
  return (
    <div className={container}>
      <h3 className={h3}>No users here :(</h3>
      <Link className={link} to='/add-user'>
        Create new user
      </Link>
    </div>
  );
};
