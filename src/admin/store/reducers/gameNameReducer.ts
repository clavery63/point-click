import { createSlice } from '@reduxjs/toolkit';
import { setGameState } from '../sharedActions';

export const gameNameSlice = createSlice({
  name: 'gameName',
  initialState: '',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.gameName);
  },
});

export default gameNameSlice.reducer;
