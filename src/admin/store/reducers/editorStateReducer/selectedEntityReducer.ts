import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Nullable } from 'game/store/types';

export type SelectedEntity = {
  type: 'items' | 'scenery' | 'doors';
  id: number;
};

export const selectedEntitySlice = createSlice({
  name: 'selectedEntity',
  initialState: null as Nullable<SelectedEntity>,
  reducers: {
    setSelected: (state, action: PayloadAction<SelectedEntity>) => action.payload,
    clearSelected: () => null,
  },
});

export const { setSelected, clearSelected } = selectedEntitySlice.actions;

export default selectedEntitySlice.reducer;
