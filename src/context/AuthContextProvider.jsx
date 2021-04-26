import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [pending, setPending] = useState(true);

  const logout = () => {
    return auth.signOut();
  };

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password).then(() => {
      logout();
    });
  };

  const signin = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
      console.log(currentUser);
    });

    console.log("CurrentUser: ", currentUser);

    return unsubscribe;
  }, [currentUser]);

  const value = {
    currentUser,
    signup,
    signin,
    logout,
    pending,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
