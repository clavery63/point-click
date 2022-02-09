import { createSlice } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';

export const flagsSlice = createSlice({
  name: 'flags',
  initialState: [] as string[],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => [...action.payload.flags]);
  },
});

export default flagsSlice.reducer;
