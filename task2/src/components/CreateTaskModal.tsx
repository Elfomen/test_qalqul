import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { createTaskRequest } from "../store/tasks/task.slice";
import dayjs from "dayjs";
import { TaskPriorities, TaskStatuses } from "../types";

export interface CreateNewTaskProps {
  name: string;
  description: string;
  status: TaskStatuses;
  startDate: Date | undefined;
  endDate: Date | undefined;
  priority: TaskPriorities;
}

type NewTaskType = keyof CreateNewTaskProps;

const CreateTaskModal: React.FC<{ open: boolean; handleClose: () => void }> = ({
  open,
  handleClose,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.tasks);
  const [data, setData] = useState<CreateNewTaskProps>({
    name: "",
    description: "",
    startDate: undefined,
    endDate: undefined,
    priority: TaskPriorities.low,
    status: TaskStatuses.todo,
  });

  const onChange = (
    key: NewTaskType,
    value: string | TaskStatuses | TaskPriorities | Date
  ) => {
    setData((old) => ({ ...old, [key]: value }));
  };

  const handleCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (data.startDate && data.endDate) {
      dispatch(
        createTaskRequest({ task: data, callback: () => handleClose() })
      );
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <form action="" onSubmit={handleCreateTask}>
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
            <Typography variant="h4">Creating a new Task</Typography>
          </center>
          {error && <span>{error}</span>}
          <TextField
            onChange={(e) => onChange("name", e.target.value)}
            label="Enter task Name"
            required
          />

          <TextField
            onChange={(e) => onChange("description", e.target.value)}
            label="Enter task description"
            multiline
            required
          />

          <DatePicker
            onChange={(date) =>
              onChange("startDate", dayjs(date).format("MM/DD/YYYY"))
            }
            label="Start date"
          />
          <DatePicker
            onChange={(date) =>
              onChange("endDate", dayjs(date).format("MM/DD/YYYY"))
            }
            label="End date"
          />

          <FormControl>
            <InputLabel id="selectitems">Task Priority</InputLabel>
            <Select
              labelId="selectItems"
              value={data.priority}
              required
              onChange={(value) =>
                onChange("priority", value.target.value as TaskPriorities)
              }
              label="Task Priority"
            >
              <MenuItem value={TaskPriorities.high}>
                {TaskPriorities.high}
              </MenuItem>
              <MenuItem value={TaskPriorities.medium}>
                {TaskPriorities.medium}
              </MenuItem>
              <MenuItem value={TaskPriorities.low}>
                {TaskPriorities.low}
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id="selectitemstatus">Status</InputLabel>
            <Select
              required
              labelId="selectitemstatus"
              value={data.status}
              onChange={(value) =>
                onChange("status", value.target.value as TaskStatuses)
              }
              label="Status"
            >
              <MenuItem value={TaskStatuses.todo}>{TaskStatuses.todo}</MenuItem>
              <MenuItem value={TaskStatuses["in-progress"]}>
                {TaskStatuses["in-progress"]}
              </MenuItem>
              <MenuItem value={TaskStatuses.done}>{TaskStatuses.done}</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            disabled={
              loading ||
              !data.name ||
              !data.startDate ||
              !data.endDate ||
              !data.description
            }
          >
            {loading && <CircularProgress size={18} />}
            Create Task
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default CreateTaskModal;
