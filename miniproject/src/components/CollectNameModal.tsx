import { Button, Modal, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { userData } from "../utils/user";

const CollectNameModal: React.FC<{
  open: boolean;
  handleClose: () => void;
}> = ({ open, handleClose }) => {
  const [name, setName] = useState("");
  const saveName = () => {
    if (name) {
      userData.setUsername(name);
      handleClose();
    }
  };

  return (
    <Modal open={open}>
      <form action="" onSubmit={saveName}>
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
            <Typography variant="h4">Enter your name</Typography>
          </center>
          <TextField
            onChange={(e) => setName(e.target.value)}
            label="Please enter your name"
            required
          />

          <Button type="submit" variant="contained" disabled={!name}>
            Save name
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default CollectNameModal;
