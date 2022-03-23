import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';

export const friendlyNameSlice = createSlice({
  name: 'friendlyName',
  initialState: '',
  reducers: {
    setFriendlyName: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.config.friendlyName);
  },
});

export const { setFriendlyName } = friendlyNameSlice.actions;

export default friendlyNameSlice.reducer;
