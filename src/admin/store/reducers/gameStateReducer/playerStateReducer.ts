import { createSlice } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';
import { PlayerState } from 'game/store/types';

export const playerStateSlice = createSlice({
  name: 'playerState',
  initialState: {} as PlayerState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.playerState);
  }
});

export default playerStateSlice.reducer;
