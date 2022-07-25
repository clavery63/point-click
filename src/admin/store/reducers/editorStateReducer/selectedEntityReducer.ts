import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Nullable } from 'game/store/types';
import { setMiscInfo } from './miscInfoReducer';

export type SelectedEntity = {
  id: number;
  type: 'entity' | 'doors' | 'verbs';
};

export const selectedEntitySlice = createSlice({
  name: 'selectedEntity',
  initialState: null as Nullable<SelectedEntity>,
  reducers: {
    setSelected: (state, action: PayloadAction<SelectedEntity>) => action.payload,
    clearSelected: () => null,
  },
  extraReducers: builder => {
    builder.addCase(setMiscInfo, () => null);
  },
});

export const { setSelected, clearSelected } = selectedEntitySlice.actions;

export default selectedEntitySlice.reducer;
