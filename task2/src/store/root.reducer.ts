// src/store/rootReducer.ts
import { combineReducers } from "redux";
import taskReducer from "./tasks/task.slice";

export const rootReducer = combineReducers({
  tasks: taskReducer,
});
