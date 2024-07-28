/* eslint-disable @typescript-eslint/no-unused-vars */
// src/store/task/taskSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskPriorities, TaskStatuses } from "../../components/CreateTaskModal";

export interface Task {
  id: number;
  name: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: Date | undefined;
  endDate: Date | undefined;
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    fetchTasksRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTasksSuccess: (state, action: PayloadAction<Task[]>) => {
      state.loading = false;
      state.tasks = action.payload;
    },
    fetchTasksFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createTaskRequest: (
      state,
      //eslint-disable-next-line @typescript-eslint/no-unused-vars
      _action: PayloadAction<{ task: Omit<Task, "id">; callback?: () => void }>
    ) => {
      state.loading = true;
      state.error = null;
    },
    createTaskSuccess: (state, action: PayloadAction<Task>) => {
      state.loading = false;
      state.tasks.push(action.payload);
    },
    createTaskFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateTaskRequest: (
      state,
      //eslint-disable-next-line @typescript-eslint/no-unused-vars
      _action: PayloadAction<{
        status: TaskStatuses;
        callback?: () => void;
        id: number;
      }>
    ) => {
      state.loading = true;
      state.error = null;
    },
    updateTaskSuccess: (state, action: PayloadAction<Task>) => {
      state.loading = false;
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);

      if (index >= 0) {
        state.tasks = [
          ...state.tasks.slice(0, index),
          action.payload,
          ...state.tasks.slice(index + 1),
        ];
      }
    },
    updateTaskFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTaskRequest: (
      state,
      _action: PayloadAction<{
        callback?: () => void;
        id: number;
      }>
    ) => {
      state.loading = true;
      state.error = null;
    },
    deleteTaskSuccess: (state, action: PayloadAction<number>) => {
      state.loading = false;
      state.tasks = [
        ...state.tasks.filter((task) => task.id !== action.payload),
      ];
    },
    deleteTaskFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
  createTaskFailure,
  createTaskRequest,
  createTaskSuccess,
  updateTaskFailure,
  updateTaskRequest,
  updateTaskSuccess,
  deleteTaskFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
} = taskSlice.actions;
export default taskSlice.reducer;
