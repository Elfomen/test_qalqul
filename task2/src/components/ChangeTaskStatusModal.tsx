import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { Task, updateTaskRequest } from "../store/tasks/task.slice";
import { TaskStatuses } from "../types";

const ChangeTaskStatusModal: React.FC<{
  open: boolean;
  handleClose: () => void;
  task: Task;
}> = ({ open, handleClose, task }) => {
  const dispatch: AppDispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.tasks);
  const [status, setStatus] = useState<TaskStatuses>(task.status);

  const statuses = [
    TaskStatuses.done,
    TaskStatuses.todo,
    TaskStatuses["in-progress"],
  ];

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      updateTaskRequest({ callback: () => handleClose(), id: task.id, status })
    );
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <form action="" onSubmit={handleUpdate}>
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
            <Typography variant="h4">Update the status of a task</Typography>
          </center>

          <FormControl>
            <InputLabel id="selectitemstatus">{task.status}</InputLabel>
            <Select
              required
              labelId="selectitemstatus"
              value={status}
              onChange={(value) =>
                setStatus(value.target.value as TaskStatuses)
              }
              label={task.status}
            >
              {statuses.map(
                (stat) =>
                  stat !== task.status && (
                    <MenuItem value={stat}>{stat}</MenuItem>
                  )
              )}
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            disabled={loading || !status}
          >
            {loading && <CircularProgress size={18} />}
            Update Status
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default ChangeTaskStatusModal;
