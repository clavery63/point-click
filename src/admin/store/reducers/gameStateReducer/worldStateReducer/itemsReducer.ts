import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';
import { Item, Lookup } from 'game/store/types';

type PositionWithId = {
  id: number;
  x: number;
  y: number;
};

type ItemWithId = {
  item: Item;
  id: number;
};

const initialState: Lookup<Item> = {};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItemPosition: (state, action: PayloadAction<PositionWithId>) => {
      const { x, y, id } = action.payload;
      const item = state[id];

      if (item.position) {
        item.position = { left: x, top: y };
      }
    },
    setItem: (state, action: PayloadAction<ItemWithId>) => {
      const { id, item } = action.payload;

      state[id] = item;
    },
  },
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.worldState.items);
  },
});

export const { setItemPosition, setItem } = itemsSlice.actions;

export default itemsSlice.reducer;
