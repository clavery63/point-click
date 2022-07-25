import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Nullable } from 'game/store/types';
import { setSelected } from './selectedEntityReducer';

export type MiscInfo = string;

export const miscInfoSlice = createSlice({
  name: 'miscInfo',
  initialState: null as Nullable<MiscInfo>,
  reducers: {
    setMiscInfo: (state, action: PayloadAction<MiscInfo>) => action.payload,
  },
  extraReducers: builder => {
    builder.addCase(setSelected, () => null);
  },
});

export const { setMiscInfo } = miscInfoSlice.actions;

export default miscInfoSlice.reducer;
