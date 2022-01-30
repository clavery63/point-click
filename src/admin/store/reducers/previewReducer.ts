import { createSlice } from '@reduxjs/toolkit';

export const previewSlice = createSlice({
  name: 'preview',
  initialState: null,
  reducers: {
    setPreview: (state, action) => action.payload,
    clearPreview: () => null,
  }
});

export const { setPreview, clearPreview } = previewSlice.actions;

export default previewSlice.reducer;
