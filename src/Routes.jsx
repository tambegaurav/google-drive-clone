import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/GoogleDrive/Dashboard";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/folder/:folderId">
          <Dashboard />
        </Route>
        <Route>
          <h1>404: Page not found</h1>
        </Route>
      </Switch>
    </div>
  );
};

export default Routes;
