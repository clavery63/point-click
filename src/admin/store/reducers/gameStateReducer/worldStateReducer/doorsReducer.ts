import { createSlice } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';
import { Door, Lookup, PlayerState } from 'game/store/types';

export const doorsSlice = createSlice({
  name: 'doors',
  initialState: {} as Lookup<Door>,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.worldState.doors);
  }
});

export default doorsSlice.reducer;
