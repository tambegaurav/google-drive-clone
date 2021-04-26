import React from "react";
import { Redirect, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContextProvider";
import { useFolder } from "../../hooks/useFolder";
import Container from "../../styled-components/Container";
import FolderFlex from "../../styled-components/FolderFlex";
import AddFolderButton from "./AddFolderButton";
import Folder from "./Folder";
import Navbar from "./Navbar";
import FolderBreadCrumbs from "./FolderBreadCrumbs";
import AddFileButton from "./AddFileButton";
import File from "./File";

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

  const { state = {} } = useLocation();

  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state.folder
  );

  console.log(folder);
  console.log(childFolders);
  console.log(childFiles);

  if (!currentUser) {
    return <Redirect to="/signin" />;
  }

  return (
    <div>
      <Navbar />
      <Container>
        <Head>
          <div>
            <FolderBreadCrumbs currentFolder={folder} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <AddFileButton currentFolder={folder} />
            <AddFolderButton currentFolder={folder} />
          </div>
        </Head>
        {/* {folder && <Folder folder={folder} />} */}
        {childFolders.length > 0 && (
          <>
            <h2 style={{ margin: "5px 15px" }}>Folders</h2>
            <FolderFlex>
              {childFolders.map((childFolder) => (
                <div key={childFolder.id}>
                  <Folder folder={childFolder} />
                </div>
              ))}
            </FolderFlex>
          </>
        )}

        {childFolders.length > 0 && childFiles.length > 0 && (
          <hr style={{ width: "95%", margin: "auto" }} />
        )}

        {childFiles.length > 0 && (
          <>
            <h2 style={{ margin: "5px 15px" }}>Files</h2>
            <FolderFlex>
              {childFiles.map((childFile) => (
                <div key={childFile.id}>
                  <File file={childFile} />
                </div>
              ))}
            </FolderFlex>
          </>
        )}
      </Container>
    </div>
  );
};

export default Dashboard;
