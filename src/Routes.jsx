import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/GoogleDrive/Dashboard";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  return (
    <div>
      <Switch>
        <PrivateRoute exact={true} path="/">
          <Dashboard />
        </PrivateRoute>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <PrivateRoute exact={true} path="/folder/:folderId">
          <Dashboard />
        </PrivateRoute>
        <Route>
          <h1>404: Page not found</h1>
        </Route>
      </Switch>
    </div>
  );
};

export default Routes;
