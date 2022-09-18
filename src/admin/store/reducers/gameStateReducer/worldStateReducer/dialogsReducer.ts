import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';
import { Dialog, DialogPage, Lookup } from 'game/store/types';

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
    addPageToDialog: (state, action: PayloadAction<{ id: number}>) => {
      const { id } = action.payload;

      const newPage: DialogPage = {
        question: '',
        answerOne: '',
        answerTwo: '',
        answerThree: '',
        answerFour: '',
      };

      state[id]?.pages.push(newPage);
    },
    editDialogPage: (
      state,
      action: PayloadAction<{ id: number; pageIndex: number; page: DialogPage }>,
    ) => {
      const { id, pageIndex, page } = action.payload;
      const dialog = state[id];

      if (dialog) {
        dialog.pages[pageIndex] = page;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.worldState.dialogs);
  },
});

export const {
  createDialogWithId,
  addPageToDialog,
  editDialogPage,
} = dialogsSlice.actions;

export default dialogsSlice.reducer;
