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
  },
});

export const { uploadGame, uploadComplete } = uploadStateSlice.actions;

export default uploadStateSlice.reducer;
