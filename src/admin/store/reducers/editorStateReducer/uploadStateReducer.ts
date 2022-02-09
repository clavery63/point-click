import { createSlice } from '@reduxjs/toolkit';

export enum UploadState {
  NONE,
  IN_PROGRESS,
  COMPLETE,
  ERROR
}

export const uploadStateSlice = createSlice({
  name: 'uploadState',
  initialState: UploadState.NONE,
  reducers: {
    uploadGame: () => UploadState.IN_PROGRESS,
    uploadComplete: () => UploadState.COMPLETE,
    resetUploadState: () => UploadState.NONE,
  },
});

export const { uploadGame, uploadComplete, resetUploadState } = uploadStateSlice.actions;

export default uploadStateSlice.reducer;
