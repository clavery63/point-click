import { createSlice } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';

export const verbNames = createSlice({
  name: 'verbNames',
  initialState: [] as string[],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.verbNames);
  },
});

export default verbNames.reducer;
