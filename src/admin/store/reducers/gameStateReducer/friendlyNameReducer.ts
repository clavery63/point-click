import { createSlice } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';

export const friendlyNameSlice = createSlice({
  name: 'friendlyName',
  initialState: '',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.friendlyName);
  },
});

export default friendlyNameSlice.reducer;
