import { Breadcrumbs } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ROOT_FOLDER } from "../../hooks/useFolder";

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
  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];

  if (currentFolder) {
    path = [...path, ...currentFolder.path];
  }

  return (
    <Breadcrumbs>
      {path.map((folder, index) => (
        <StyledLink
          key={folder.id}
          // to={folder.id ? `/folder/${folder.id}` : "/"}

          to={{
            pathname: folder.id ? `/folder/${folder.id}` : "/",
            state: { folder: { ...folder, path: path.slice(1, index) } },
          }}
        >
          {folder.name}
        </StyledLink>
      ))}
      {currentFolder && (
        <StyledLink
          style={{ pointerEvents: "none" }}
          to={`/folder/${currentFolder.id}`}
        >
          {currentFolder.name}
        </StyledLink>
      )}
    </Breadcrumbs>
  );
};

export default FolderBreadCrumbs;
