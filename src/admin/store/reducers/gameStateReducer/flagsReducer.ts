import { createSlice } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';
import { Flags } from 'game/store/types';

export const flagsSlice = createSlice({
  name: 'flags',
  initialState: [] as Flags,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.flags);
  },
});

export default flagsSlice.reducer;
