import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  CircularProgress,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChangeTaskStatusModal from "../components/ChangeTaskStatusModal";
import CreateTaskModal from "../components/CreateTaskModal";
import AppDataTable from "../components/DataTable";
import { AppDispatch, RootState } from "../store/store";
import {
  deleteTaskRequest,
  fetchTasksRequest,
  Task,
} from "../store/tasks/task.slice";
const TaskList = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isTaskModalOpened, setIsTaskModalOpened] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedTask, setUpdatedTask] = useState<Task>();

  const { loading, tasks } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasksRequest());
  }, []);

  if (loading) return <CircularProgress size={75} />;

  const deleteTask = (id: number) => {
    dispatch(deleteTaskRequest({ callback: () => {}, id }));
  };

  return (
    <>
      <Stack
        sx={{
          ml: 10,
          mr: 10,
        }}
      >
        <Button onClick={() => setIsTaskModalOpened(true)}>
          Add a new task
        </Button>
        <center>
          {tasks && tasks.length === 0 && (
            <p>You have no tasks for the moment</p>
          )}
        </center>
        <center>{loading && <CircularProgress size={28} />}</center>
        {tasks.length > 0 && (
          <AppDataTable
            columns={[
              "id",
              "Name",
              "Description",
              "Start date",
              "End date",
              "Priority",
              "Status",
              "Actions",
            ]}
            rows={tasks.map((task) => ({
              id: task.id,
              name: task.name,
              description: task.description,
              startDate: (
                <span>
                  {dayjs(task.startDate).format("dddd MMMM MM, YYYY")}
                </span>
              ),
              endDate: (
                <span>{dayjs(task.endDate).format("dddd MMMM MM, YYYY")}</span>
              ),
              priority: <span>{task.priority}</span>,
              status: <span>{task.status}</span>,
              actions: (
                <TaskItemActions
                  onUpdate={() => {
                    setUpdatedTask(task);
                    setIsUpdating(true);
                  }}
                  onDelete={() => {
                    deleteTask(task.id);
                  }}
                />
              ),
            }))}
          />
        )}

        {isUpdating && updatedTask && (
          <ChangeTaskStatusModal
            handleClose={() => setIsUpdating(false)}
            task={updatedTask}
            open={isUpdating}
          />
        )}

        {isTaskModalOpened && (
          <CreateTaskModal
            open={isTaskModalOpened}
            handleClose={() => setIsTaskModalOpened(false)}
          />
        )}
      </Stack>
    </>
  );
};

const TaskItemActions: React.FC<{
  onUpdate: () => void;
  onDelete: () => void;
}> = ({ onUpdate, onDelete }) => {
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={() => setOpen(!open)}
      >
        <MenuIcon />
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <MenuList
                autoFocusItem={open}
                id="composition-menu"
                aria-labelledby="composition-button"
                onKeyDown={() => {}}
              >
                <MenuItem
                  onClick={() => {
                    setOpen(false);
                    onUpdate();
                  }}
                >
                  Change Status
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setOpen(false);
                    onDelete();
                  }}
                >
                  Delete
                </MenuItem>
              </MenuList>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default TaskList;
