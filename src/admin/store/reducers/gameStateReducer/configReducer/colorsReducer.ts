import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';
import { ColorsConfig } from 'game/store/types';

const initialState = {
  background: '',
};

export const colorsSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {
    setColors: (state, action: PayloadAction<ColorsConfig>) => {
      return action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.config.colors);
  },
});

export const { setColors } = colorsSlice.actions;

export default colorsSlice.reducer;
