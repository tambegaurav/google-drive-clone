import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FolderIcon from "@material-ui/icons/Folder";

const StyledFolder = styled(Link)`
  border: 2px solid #19348b;
  padding: 7px 15px;
  border-radius: 7px;
  text-decoration: none;
  color: #19348b;
  font-size: 20px;
  font-weight: 500;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  width: fit-content;
  gap: 12px;
  margin: 15px;

  /* min-width: 100px; */
  /* max-width: 250px; */

  :hover {
    background-color: #19348b;
    /* border: none; */
    color: #fff;
  }
`;

const Folder = ({ folder }) => {
  return (
    <StyledFolder to={`/folder/${folder.id}`}>
      <FolderIcon />
      {folder.name.length > 13
        ? folder.name.substring(0, 13 - 3) + "..."
        : folder.name}
    </StyledFolder>
  );
};

export default Folder;
