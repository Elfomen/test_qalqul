// src/store/task/taskSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Delta } from "quill/core";

export interface Document {
  id: number;
  name: string;
  data: Delta;
  createdOn: Date;
  updatedOn: Date;
}

export interface DocumentState {
  documents: Document[];
  loading: boolean;
  error: string | null;
}

const initialState: DocumentState = {
  documents: [],
  loading: false,
  error: null,
};

interface createDocumentPayload {
  name: string;
}

const documentSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    fetchDocumentsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDocumentsSuccess: (state, action: PayloadAction<Document[]>) => {
      state.loading = false;
      state.documents = action.payload;
    },
    fetchDocumentsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createDocumentsRequest: (
      state,
      action: PayloadAction<{
        document: createDocumentPayload;
        callback?: () => void;
      }>
    ) => {
      state.loading = true;
      state.error = null;
    },
    createDocumentsSuccess: (state, action: PayloadAction<Document>) => {
      state.loading = false;
      state.documents.push(action.payload);
    },
    createDocumentsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteDocumentRequest: (state, action: PayloadAction<number>) => {
      state.loading = true;
      state.error = null;
    },
    deleteDocumentfailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteDocumentSuccess: (state, action: PayloadAction<number>) => {
      state.loading = false;
      state.error = null;
      state.documents = [
        ...state.documents.filter((doc) => doc.id !== action.payload),
      ];
    },
    updateDocumentNameRequest: (
      state,
      action: PayloadAction<{ id: number; name: string; callback?: () => void }>
    ) => {
      state.loading = true;
      state.error = null;
    },
    updateDocumentNamefailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateDocumentNameSuccess: (state, action: PayloadAction<Document>) => {
      state.loading = false;
      state.error = null;
      const index = state.documents.findIndex(
        (doc) => doc.id === action.payload.id
      );

      if (index >= 0) {
        state.documents = [
          ...state.documents.slice(0, index),
          action.payload,
          ...state.documents.slice(index + 1),
        ];
      }
    },
  },
});

export const {
  fetchDocumentsFailure,
  fetchDocumentsRequest,
  fetchDocumentsSuccess,
  createDocumentsFailure,
  createDocumentsRequest,
  createDocumentsSuccess,
  deleteDocumentRequest,
  deleteDocumentSuccess,
  deleteDocumentfailure,
  updateDocumentNameRequest,
  updateDocumentNameSuccess,
  updateDocumentNamefailure,
} = documentSlice.actions;
export default documentSlice.reducer;
