import React from "react";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import styled from "styled-components";

const StyledLink = styled.a`
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

const File = ({ file }) => {
  return (
    // eslint-disable-next-line react/jsx-no-target-blank
    <StyledLink href={file.url} target="_blank">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: "5px",
        }}
      >
        <InsertDriveFileIcon />

        {file.name.length > 13
          ? file.name.substring(0, 13 - 3) + "..."
          : file.name}
      </div>
    </StyledLink>
  );
};

export default File;
