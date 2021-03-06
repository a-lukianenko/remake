import React from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Navbar } from "./components/Navbar/Navbar";
import { AddUser } from "./pages/AddUser/AddUser";
import { UsersList } from "./pages/UsersList/UsersList";
import { UserProfile } from "./pages/UserProfile/UserProfile";
import { EditProfile } from "./pages/EditProfile/EditProfile";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/add-user' component={AddUser} />
        <Route exact path='/users' component={UsersList} />
        <Route exact path='/users/:userId' component={UserProfile} />
        <Route
          exact
          path='/users/:userId/edit/:section'
          component={EditProfile}
        />
        <Redirect from='/users/:userId/edit' to='/users/:userId/edit/account' />
        <Redirect to='/add-user' />
      </Switch>
    </Router>
  );
}
