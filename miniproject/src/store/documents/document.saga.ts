import { call, put, takeEvery } from "redux-saga/effects";

import { API_BASE_URL } from "../../constants";
import {
  createDocumentsFailure,
  createDocumentsRequest,
  createDocumentsSuccess,
  deleteDocumentRequest,
  deleteDocumentSuccess,
  fetchDocumentsFailure,
  fetchDocumentsRequest,
  fetchDocumentsSuccess,
  updateDocumentNamefailure,
  updateDocumentNameRequest,
  updateDocumentNameSuccess,
} from "./document.slice";

function* fetchDocuments() {
  try {
    const response = yield call(fetch, `${API_BASE_URL}/miniproject/documents`);
    const data = yield response.json();
    yield put(fetchDocumentsSuccess(data));
  } catch (error) {
    yield put(fetchDocumentsFailure("Failed to fetch tasks"));
  }
}

function* deleteDocument(action: ReturnType<typeof deleteDocumentRequest>) {
  try {
    const response = yield call(
      fetch,
      `${API_BASE_URL}/miniproject/document/${action.payload}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    response.json();
    yield put(deleteDocumentSuccess(action.payload));
  } catch (error) {
    yield put(fetchDocumentsFailure("Failed to fetch tasks"));
  }
}

function* updateDocumentName(
  action: ReturnType<typeof updateDocumentNameRequest>
) {
  try {
    const response = yield call(
      fetch,
      `${API_BASE_URL}/miniproject/document/${action.payload.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newName: action.payload.name }),
      }
    );
    const data = yield response.json();

    yield put(updateDocumentNameSuccess(data));
    if (
      action.payload.callback &&
      typeof action.payload.callback === "function"
    ) {
      action.payload.callback();
    }
  } catch (error) {
    yield put(
      updateDocumentNamefailure("Faield to update document, please try again")
    );
  }
}

function* createDocument(action: ReturnType<typeof createDocumentsRequest>) {
  try {
    const response = yield call(fetch, `${API_BASE_URL}/miniproject/document`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(action.payload.document),
    });
    const data = yield response.json();
    yield put(createDocumentsSuccess(data));
    if (
      action.payload.callback &&
      typeof action.payload.callback === "function"
    ) {
      action.payload.callback();
    }
  } catch (error) {
    yield put(createDocumentsFailure("Failed to create task"));
  }
}

export function* watchFetchDocuments() {
  yield takeEvery(fetchDocumentsRequest.type, fetchDocuments);
}

export function* watchCreateDocument() {
  yield takeEvery(createDocumentsRequest.type, createDocument);
}

export function* watchUpdateDocument() {
  yield takeEvery(updateDocumentNameRequest.type, updateDocumentName);
}

export function* watchDeleteDocument() {
  yield takeEvery(deleteDocumentRequest.type, deleteDocument);
}
