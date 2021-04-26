import { Breadcrumbs } from "@material-ui/core";
import React from "react";
import { Redirect, useParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContextProvider";
import { useFolder } from "../../hooks/useFolder";
import Container from "../../styled-components/Container";
import FolderFlex from "../../styled-components/FolderFlex";
import AddFolderButton from "./AddFolderButton";
import Folder from "./Folder";
import Navbar from "./Navbar";
import MaterialLink from "@material-ui/core/Link";
import FolderBreadCrumbs from "./FolderBreadCrumbs";

const Head = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
`;

const Dashboard = () => {
  const { currentUser } = useAuth();

  const { folderId } = useParams();

  const { folder, childFolders } = useFolder(folderId);

  console.log(folder);
  console.log(childFolders);

  if (!currentUser) {
    return <Redirect to="/signin" />;
  }

  return (
    <div>
      <Navbar />
      <Container>
        <Head>
          <div>
            <Breadcrumbs>
              <FolderBreadCrumbs currentFolder={folder} />
            </Breadcrumbs>
          </div>
          <AddFolderButton currentFolder={folder} />
        </Head>
        {/* {folder && <Folder folder={folder} />} */}
        {childFolders.length > 0 && (
          <FolderFlex>
            {childFolders.map((childFolder) => (
              <div key={childFolder.id}>
                <Folder folder={childFolder} />
              </div>
            ))}
          </FolderFlex>
        )}
      </Container>
    </div>
  );
};

export default Dashboard;
