import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';

export const verbNamesSlice = createSlice({
  name: 'verbNames',
  initialState: [] as string[],
  reducers: {
    setVerbNames: (state, action: PayloadAction<string[]>) => {
      return action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.verbNames);
  },
});

export const { setVerbNames } = verbNamesSlice.actions;

export default verbNamesSlice.reducer;
