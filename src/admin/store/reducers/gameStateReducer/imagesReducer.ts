import { createSlice } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';

export const imagesSlice = createSlice({
  name: 'images',
  initialState: {} as Map<string, HTMLImageElement>,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.images);
  }
});

export default imagesSlice.reducer;
