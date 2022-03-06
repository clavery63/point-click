import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';
import { Flags } from 'game/store/types';

export const flagsSlice = createSlice({
  name: 'flags',
  initialState: [] as Flags,
  reducers: {
    setFlags: (state, action: PayloadAction<Flags>) => {
      const flags = action.payload.filter(flag => flag !== '');
      return flags;
    },
  },
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.flags);
  },
});

export const { setFlags } = flagsSlice.actions;

export default flagsSlice.reducer;
