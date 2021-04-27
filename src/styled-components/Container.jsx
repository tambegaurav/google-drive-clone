import React from "react";
import styled from "styled-components";

const MainDiv = styled.div`
  height: 90vh;
  background-color: #d9e2ff;
`;

const Container = ({ children }) => {
  return <MainDiv>{children}</MainDiv>;
};

export default Container;
