import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Navbar } from "./components/Navbar/Navbar";
import { AddUser } from "./pages/AddUser/AddUser";
import { UsersList } from "./pages/UserList/UserList";
import { UserProfile } from "./pages/UserProfile/UserProfile";
import { EditProfile } from "./pages/EditProfile/EditProfile";
import { fetchUsersAsync } from "features/users/usersSlice";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersAsync());
  });

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/add-user' component={AddUser} />
        <Route exact path='/users' component={UsersList} />
        <Route exact path='/users/:userId' component={UserProfile} />
        <Route exact path='/users/:userId/edit' component={EditProfile} />
        <Redirect to='/add-user' />
      </Switch>
    </Router>
  );
}
