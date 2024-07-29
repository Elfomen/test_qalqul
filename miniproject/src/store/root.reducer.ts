import { combineReducers } from "redux";

import documentReducer from "./documents/document.slice";

export const rootReducer = combineReducers({
  document: documentReducer,
});
