import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';
import { PositionsConfig } from 'game/store/types';

type VerbPayload = {
  index: number;
  top: number;
  left: number;
};

export const positionsSlice = createSlice({
  name: 'positions',
  initialState: {} as PositionsConfig,
  reducers: {
    setVerbPosition: (state, action: PayloadAction<VerbPayload>) => {
      const { index, top, left } = action.payload;

      state.verbs[index] = { top, left };
    },
  },
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.config.positions);
  },
});

export const { setVerbPosition } = positionsSlice.actions;

export default positionsSlice.reducer;
