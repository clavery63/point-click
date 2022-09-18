import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';
import { Dialog, Lookup } from 'game/store/types';

export const dialogsSlice = createSlice({
  name: 'dialogs',
  initialState: {} as Lookup<Dialog>,
  reducers: {
    createDialogWithId: (state, action: PayloadAction<{ id: number}>) => {
      const { id } = action.payload;

      state[id] = {
        id,
        avatar: 'default-dialog',
        pages: [],
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.worldState.dialogs);
  },
});

export const {
  createDialogWithId,
} = dialogsSlice.actions;

export default dialogsSlice.reducer;
