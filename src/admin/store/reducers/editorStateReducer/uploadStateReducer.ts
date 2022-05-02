import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    uploadGame: (state, action: PayloadAction<string>) => UploadState.IN_PROGRESS,
    uploadComplete: () => UploadState.COMPLETE,
    uploadError: () => UploadState.ERROR,
    resetUploadState: () => UploadState.NONE,
  },
});

export const {
  uploadGame, uploadComplete, resetUploadState, uploadError,
} = uploadStateSlice.actions;

export default uploadStateSlice.reducer;
