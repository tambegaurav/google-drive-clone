import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./context/AuthContextProvider";

export default function PrivateRoute({ children, path, exact }) {
  const { currentUser } = useAuth();

  return !currentUser ? (
    <Redirect to="/signin" />
  ) : (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
}
