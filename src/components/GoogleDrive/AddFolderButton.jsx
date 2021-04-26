import { Button, Modal, Paper, TextField } from "@material-ui/core";
import React, { useState } from "react";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import styled from "styled-components";
import { database } from "../../firebase";
import { useAuth } from "../../context/AuthContextProvider";
import { ROOT_FOLDER } from "../../hooks/useFolder";

const CenteredModal = styled(Modal)`
  display: grid;
  place-items: center;
  width: 400px;
  margin: auto;
`;

const StyledAddButton = styled(Button)`
  border: none;
  :hover {
    background-color: #fff !important;
  }
`;

const AddFolderButton = ({ currentFolder }) => {
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState("");

  const { currentUser } = useAuth();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddFolder = () => {
    if (currentFolder === null) {
      return;
    }

    const path = [...currentFolder.path];

    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id });
    }

    console.log("Folder created");

    //create folder in database

    database.folders.add({
      name: folderName,
      userId: currentUser.uid,
      parentId: currentFolder.id,
      path,
      createdAt: database.getCurrentTimestamp(),
    });

    setFolderName("");
    handleClose();
  };

  return (
    <>
      <StyledAddButton onClick={handleOpen}>
        <CreateNewFolderIcon style={{ color: "#19348B" }} />
      </StyledAddButton>
      <CenteredModal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Paper
          style={{
            padding: "15px",
            borderRadius: "7px",
            width: "100%",
            paddingBottom: "20px",
          }}
        >
          <h1>Add New Folder</h1>
          <div
            style={{
              display: "grid",
              placeItems: "center",
              margin: "15px",
              marginBottom: "30px",
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              label="Enter folder name here..."
              onChange={(e) => setFolderName(e.target.value)}
            />
          </div>
          <footer
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              onClick={handleAddFolder}
              color="primary"
              variant="contained"
            >
              Add Folder
            </Button>
            <Button onClick={handleClose} color="primary" variant="contained">
              Cancel
            </Button>
          </footer>
        </Paper>
      </CenteredModal>
    </>
  );
};

export default AddFolderButton;
