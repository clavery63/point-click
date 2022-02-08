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
      const oldItem = state[action.payload.id];
      if (!oldItem.position) {
        return state;
      }
      return {
        ...state,
        [action.payload.id]: {
          ...oldItem,
          position: {
            width: oldItem.position.width,
            height: oldItem.position.height,
            left: action.payload.x,
            top: action.payload.y,
          },
        },
      };
    },
    setItem: (state, action: PayloadAction<ItemWithId>) => {
      return {
        ...state,
        [action.payload.id]: action.payload.item,
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.worldState.items);
  },
});

export const { setItemPosition, setItem } = itemsSlice.actions;

export default itemsSlice.reducer;
