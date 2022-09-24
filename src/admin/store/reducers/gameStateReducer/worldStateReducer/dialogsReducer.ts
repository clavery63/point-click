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
        answers: [
          { text: '' },
          { text: '' },
          { text: '' },
          { text: '' },
        ],
      };

      state[id]?.pages.push(newPage);
    },
    editDialogAvatar: (state, action: PayloadAction<{ dialogId: number; avatar: string}>) => {
      const { dialogId, avatar } = action.payload;

      if (state[dialogId] != null) {
        state[dialogId].avatar = avatar;
      }
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
    deleteDialogPage: (
      state,
      action: PayloadAction<{ id: number; pageIndex: number }>,
    ) => {
      const { id, pageIndex } = action.payload;
      const dialog = state[id];

      dialog?.pages.splice(pageIndex, 1);
    },
  },
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.worldState.dialogs);
  },
});

export const {
  createDialogWithId,
  addPageToDialog,
  editDialogAvatar,
  editDialogPage,
  deleteDialogPage,
} = dialogsSlice.actions;

export default dialogsSlice.reducer;
