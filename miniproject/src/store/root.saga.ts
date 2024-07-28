// src/store/rootSaga.ts
import { all } from "redux-saga/effects";
import {
  watchCreateDocument,
  watchDeleteDocument,
  watchFetchDocuments,
  watchUpdateDocument,
} from "./documents/document.saga";

export function* rootSaga() {
  yield all([
    watchFetchDocuments(),
    watchCreateDocument(),
    watchUpdateDocument(),
    watchDeleteDocument(),
  ]);
}
