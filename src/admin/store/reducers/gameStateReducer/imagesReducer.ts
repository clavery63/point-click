import { createSlice } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';

const initialState: Record<string, HTMLImageElement> = {};

export const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => Object.fromEntries(action.payload.images));
  },
});

export default imagesSlice.reducer;
