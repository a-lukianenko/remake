import { NavLink } from "react-router-dom";
import css from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <div className={css.wrapper}>
      <nav className={css.Navbar}>
        <NavLink to='/add-user'>Remake</NavLink>
        <ul className={css.menu}>
          <li>
            <NavLink to='/add-user' activeClassName={css.active}>
              Add new user
            </NavLink>
          </li>
          <li>
            <NavLink exact to='/users' activeClassName={css.active}>
              List of users
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
