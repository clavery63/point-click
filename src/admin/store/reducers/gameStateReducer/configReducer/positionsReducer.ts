import { createSlice } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';
import { PositionsConfig } from 'game/store/types';

export const positionsSlice = createSlice({
  name: 'positions',
  initialState: {} as PositionsConfig,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.config.positions);
  },
});

export default positionsSlice.reducer;
