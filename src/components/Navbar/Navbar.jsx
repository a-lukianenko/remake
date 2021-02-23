import { NavLink, Link } from "react-router-dom";
import { wrapper, navbar, menu, active, navLink } from "./Navbar.module.css";
import Logo from "assets/img/Logo.png";
import { ReactComponent as AddUser } from "assets/img/addUser.svg";
import { ReactComponent as UserList } from "assets/img/userList.svg";

export const Navbar = () => {
  return (
    <div className={wrapper}>
      <nav className={navbar}>
        <Link to='/add-user'>
          <img src={Logo} alt='logo' />
        </Link>
        <ul className={menu}>
          <li>
            <NavLink
              to='/add-user'
              className={navLink}
              activeClassName={active}
            >
              <AddUser /> Add new user
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to='/users'
              className={navLink}
              activeClassName={active}
            >
              <UserList /> List of users
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
