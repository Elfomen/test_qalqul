import {
  Button,
  CircularProgress,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDocumentsRequest } from "../store/documents/document.slice";
import { RootState } from "../store/store";

const CreateDocumentModal: React.FC<{
  open: boolean;
  handleClose: () => void;
}> = ({ open, handleClose }) => {
  const [name, setName] = useState("");
  const { loading } = useSelector((state: RootState) => state.document);
  const dispatch = useDispatch();

  const createDocument = () => {
    dispatch(
      createDocumentsRequest({
        document: {
          name,
        },
        callback: handleClose,
      })
    );
  };

  return (
    <Modal open={open}>
      <form action="" onSubmit={createDocument}>
        <Stack
          gap={4}
          width={"50%"}
          margin={"auto"}
          style={{ backgroundColor: "white" }}
          padding={5}
          sx={{
            mt: 10,
            borderRadius: 2,
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <center>
            <Typography variant="h4">Create a new document</Typography>
          </center>
          <TextField
            onChange={(e) => setName(e.target.value)}
            label="Enter document name"
            required
          />

          <Button type="submit" variant="contained" disabled={!name || loading}>
            {loading && <CircularProgress size={18} />}
            Create document
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default CreateDocumentModal;
