import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(NavLink)`
  text-decoration: none;
  font-size: 18px;
  color: #222222;
  font-weight: 500;

  :hover {
    color: #272e94;
  }
`;

const FolderBreadCrumbs = ({ currentFolder }) => {
  return (
    <>{currentFolder && <StyledLink to="/">{currentFolder.name}</StyledLink>}</>
  );
};

export default FolderBreadCrumbs;
