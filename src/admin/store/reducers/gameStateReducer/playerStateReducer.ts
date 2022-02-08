import { createSlice } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';
import defaultState from 'game/store/defaultState';
import { PlayerState } from 'game/store/types';

const initialState: PlayerState = defaultState.playerState;

export const playerStateSlice = createSlice({
  name: 'playerState',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.playerState);
  },
});

export default playerStateSlice.reducer;
