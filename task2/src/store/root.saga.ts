// src/store/rootSaga.ts
import { all } from "redux-saga/effects";
import {
  watchCreateTask,
  watchDeleteTask,
  watchFetchTasks,
  watchUpdateTask,
} from "./tasks/task.saga";

export function* rootSaga() {
  yield all([
    watchFetchTasks(),
    watchCreateTask(),
    watchUpdateTask(),
    watchDeleteTask(),
  ]);
}
