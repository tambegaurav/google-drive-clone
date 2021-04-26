import React from "react";
import styled from "styled-components";

const MainDiv = styled.div`
  height: 90vh;
  background-color: #a3b5f1;
`;

const Container = ({ children }) => {
  return <MainDiv>{children}</MainDiv>;
};

export default Container;
