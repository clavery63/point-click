import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';
import { ImgConfig } from 'game/store/types';

export const imgSlice = createSlice({
  name: 'img',
  initialState: {} as ImgConfig,
  reducers: {
    setImageConfig: (state, action: PayloadAction<ImgConfig>) => {
      return action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.config.img);
  },
});

export const { setImageConfig } = imgSlice.actions;

export default imgSlice.reducer;
