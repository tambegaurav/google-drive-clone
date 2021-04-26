import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Input, LinearProgress } from "@material-ui/core";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import styled from "styled-components";
import { database, storage } from "../../firebase";
import { useAuth } from "../../context/AuthContextProvider";
import { ROOT_FOLDER } from "../../hooks/useFolder";
import { v4 as uuid } from "uuid";
import Alert from "@material-ui/lab/Alert";
import { AlertTitle } from "@material-ui/lab";

// const CenteredModal = styled(Modal)`
//   display: grid;
//   place-items: center;
//   width: 400px;
//   margin: auto;
// `;

const StyledLabel = styled.label`
  /* box-shadow: 0px 0px 5px grey; */
  padding: 7px 20px;
  border-radius: 5px;
  display: grid;
  place-items: center;
  :hover {
    /* box-shadow: 0px 0px 3px grey; */
    background-color: #f7f7f7;
  }
`;

const AddFileButton = ({ currentFolder }) => {
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const { currentUser } = useAuth();

  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (currentFolder == null || file == null) return;

    const id = uuid();
    setUploadingFiles((previousUploadingFiles) => [
      ...previousUploadingFiles,
      {
        id: id,
        name: file.name,
        progress: 0,
        error: false,
      },
    ]);

    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${currentFolder.path.join("/")}`
        : `${currentFolder.path.join("/")}/${currentFolder.name}`;

    const uploadTask = storage
      .ref(`/files/${currentUser.uid}/${filePath}/${file.name}`)
      .put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;

        setUploadingFiles((prev) => {
          return prev.map((uploadFile) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, progress: progress };
            }

            return uploadFile;
          });
        });
      },
      () => {
        setUploadingFiles((prev) => {
          return prev.map((uploadFile) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, error: true };
            }
            return uploadFile;
          });
        });
      },
      () => {
        setUploadingFiles((prev) => {
          return prev.filter((uploadFile) => {
            return uploadFile.id !== id;
          });
        });

        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          database.files
            .where("name", "==", file.name)
            .where("userId", "==", currentUser.uid)
            .where("folderId", "==", currentFolder.id)
            .get()
            .then((existingFiles) => {
              const existingFile = existingFiles.docs[0];
              if (existingFile) {
                existingFile.ref.update({ url: url });
              } else {
                database.files.add({
                  url: url,
                  name: file.name,
                  createdAt: database.getCurrentTimestamp(),
                  folderId: currentFolder.id,
                  userId: currentUser.uid,
                });
              }
            });
          console.log(url);
        });
      }
    );
  };

  return (
    <>
      <StyledLabel style={{ cursor: "pointer" }}>
        <NoteAddIcon style={{ color: "#19348B" }} />
        <Input
          type="file"
          onChange={handleUpload}
          style={{ opacity: 0, position: "absolute", left: "-9999px" }}
        />
      </StyledLabel>

      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              maxWidth: "250px",
            }}
          >
            {uploadingFiles.map((file) => (
              <Alert
                key={file.id}
                onClose={() => {
                  setUploadingFiles((prev) => {
                    return prev.filter((uploadFile) => {
                      return uploadFile.id !== file.id;
                    });
                  });
                }}
                severity="success"
              >
                <AlertTitle>{file.name}</AlertTitle>
                <div>
                  <LinearProgress
                    variant={file.error ? "secondary" : "primary"}
                    value={file.error ? 100 : file.progress * 100}
                  />
                  <label>
                    {file.error
                      ? "Error"
                      : `${Math.round(file.progress * 100)}%`}
                  </label>
                </div>
              </Alert>
            ))}
          </div>,
          document.body
        )}
    </>
  );
};

export default AddFileButton;
