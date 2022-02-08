import { createSlice } from '@reduxjs/toolkit';
import { GameStoreState, Nullable } from 'game/store/types';

export const previewSlice = createSlice({
  name: 'preview',
  initialState: null as Nullable<GameStoreState>,
  reducers: {
    setPreview: (state, action) => action.payload,
    clearPreview: () => null,
  },
});

export const { setPreview, clearPreview } = previewSlice.actions;

export default previewSlice.reducer;
