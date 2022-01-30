import { createSlice } from '@reduxjs/toolkit';

export const previewSlice = createSlice({
  name: 'preview',
  initialState: null,
  reducers: {
    setPreview: (state, action) => {
      console.log('setPreview:', action.payload);
      return action.payload;
    },
    clearPreview: () => null,
  }
});

export const { setPreview, clearPreview } = previewSlice.actions;

export default previewSlice.reducer;
