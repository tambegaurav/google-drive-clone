import React from "react";
import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const FolderFlex = ({ children }) => {
  return <Flex>{children}</Flex>;
};

export default FolderFlex;
