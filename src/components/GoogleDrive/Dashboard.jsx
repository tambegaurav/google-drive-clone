import React from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContextProvider";
import Container from "../../styled-components/Container";
import AddFolderButton from "./AddFolderButton";
import Navbar from "./Navbar";

const Head = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
`;

const Dashboard = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Redirect to="/signin" />;
  }

  return (
    <div>
      <Navbar />
      <Container>
        <Head>
          <h1>Dashboard</h1>
          <AddFolderButton />
        </Head>
      </Container>
    </div>
  );
};

export default Dashboard;
