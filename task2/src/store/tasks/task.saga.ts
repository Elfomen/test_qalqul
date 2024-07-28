// src/store/task/taskSaga.ts
import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
  createTaskSuccess,
  createTaskFailure,
  createTaskRequest,
  updateTaskSuccess,
  updateTaskRequest,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFailure,
} from "./task.slice";
import { API_BASE_URL } from "../../constants";

function* fetchTasks() {
  try {
    const response = yield call(fetch, `${API_BASE_URL}/task2/task-list`);
    const data = yield response.json();
    yield put(fetchTasksSuccess(data));
  } catch (error) {
    yield put(fetchTasksFailure("Failed to fetch tasks"));
  }
}

function* createTask(action: ReturnType<typeof createTaskRequest>) {
  try {
    const response = yield call(fetch, `${API_BASE_URL}/task2/task`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(action.payload.task),
    });
    const data = yield response.json();
    yield put(createTaskSuccess(data));
    if (
      action.payload.callback &&
      typeof action.payload.callback === "function"
    ) {
      action.payload.callback();
    }
  } catch (error) {
    yield put(createTaskFailure("Failed to create task"));
  }
}

function* changeTaskStatus(action: ReturnType<typeof updateTaskRequest>) {
  try {
    const response = yield call(
      fetch,
      `${API_BASE_URL}/task2/task/${action.payload.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: action.payload.status }),
      }
    );
    const data = yield response.json();
    yield put(updateTaskSuccess(data));
    if (
      action.payload.callback &&
      typeof action.payload.callback === "function"
    ) {
      action.payload.callback();
    }
  } catch (error) {
    yield put(createTaskFailure("Failed to update task"));
  }
}

function* deleteTask(action: ReturnType<typeof deleteTaskRequest>) {
  try {
    yield call(fetch, `${API_BASE_URL}/task2/task/${action.payload.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    yield put(deleteTaskSuccess(action.payload.id));
    if (
      action.payload.callback &&
      typeof action.payload.callback === "function"
    ) {
      action.payload.callback();
    }
  } catch (error) {
    yield put(deleteTaskFailure("Failed to delete task"));
  }
}

export function* watchFetchTasks() {
  yield takeEvery(fetchTasksRequest.type, fetchTasks);
}

export function* watchCreateTask() {
  yield takeEvery(createTaskRequest.type, createTask);
}

export function* watchUpdateTask() {
  yield takeEvery(updateTaskRequest.type, changeTaskStatus);
}

export function* watchDeleteTask() {
  yield takeEvery(deleteTaskRequest.type, deleteTask);
}
