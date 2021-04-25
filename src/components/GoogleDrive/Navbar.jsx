import { Button } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContextProvider";

const NavBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #0f418b;
  height: 10vh;
  color: white;
`;

const Navbar = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <NavBar>
      <h1>GT-Drive</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </NavBar>
  );
};

export default Navbar;
