import { NavLink, Link } from "react-router-dom";
import { wrapper, navbar, menu, active } from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <div className={wrapper}>
      <nav className={navbar}>
        <Link to='/add-user'>Remake</Link>
        <ul className={menu}>
          <li>
            <NavLink to='/add-user' activeClassName={active}>
              Add new user
            </NavLink>
          </li>
          <li>
            <NavLink exact to='/users' activeClassName={active}>
              List of users
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
