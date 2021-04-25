import React from "react";
import styled from "styled-components";

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const CenteredContainer = ({ children }) => {
  return <CenteredDiv>{children}</CenteredDiv>;
};

export default CenteredContainer;
