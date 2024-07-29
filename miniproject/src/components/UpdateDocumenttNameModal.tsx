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
import {
  Document,
  updateDocumentNameRequest,
} from "../store/documents/document.slice";
import { RootState } from "../store/store";

const UpdateDocumentNameModal: React.FC<{
  open: boolean;
  handleClose: () => void;
  document: Document;
}> = ({ open, handleClose, document }) => {
  const [name, setName] = useState(document.name);
  const { loading } = useSelector((state: RootState) => state.document);
  const dispatch = useDispatch();

  const updateName = () => {
    dispatch(
      updateDocumentNameRequest({
        id: document.id,
        name,
        callback: handleClose,
      })
    );
  };

  return (
    <Modal open={open}>
      <form action="" onSubmit={updateName}>
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
            <Typography variant="h4">Edit document name</Typography>
          </center>
          <TextField
            onChange={(e) => setName(e.target.value)}
            label={document.name}
            required
          />

          <Button type="submit" variant="contained" disabled={!name || loading}>
            {loading && <CircularProgress size={18} />}
            Save name
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default UpdateDocumentNameModal;
