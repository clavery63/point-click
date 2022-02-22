import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setGameState } from '../sharedActions';

export const gameNameSlice = createSlice({
  name: 'gameName',
  initialState: '',
  reducers: {
    setGameName: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.gameName);
  },
});

export const { setGameName } = gameNameSlice.actions;

export default gameNameSlice.reducer;
