import { createSlice } from '@reduxjs/toolkit';

export const selectedEntitySlice = createSlice({
  name: 'selectedEntity',
  initialState: null,
  reducers: {
    setSelected: (state, action) => action.payload,
    clearSelected: () => null,
  }
});

export const { setSelected, clearSelected } = selectedEntitySlice.actions;

export default selectedEntitySlice.reducer;
