import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';
import { Scenery, Lookup } from 'game/store/types';

type PositionWithId = {
  id: number;
  x: number;
  y: number;
  field: 'startPosition' | 'endPosition';
};

type SizeWithId = {
  id: number;
  width: number;
  height: number;
};

const initialState: Lookup<Scenery> = {};

export const scenerySlice = createSlice({
  name: 'scenery',
  initialState,
  reducers: {
    setSceneryPosition: (state, action: PayloadAction<PositionWithId>) => {
      const {
        id, x, y, field,
      } = action.payload;
      const scenery = state[id];

      scenery[field] = { left: x, top: y };
    },
    setScenerySize: (state, action: PayloadAction<SizeWithId>) => {
      const { id, width, height } = action.payload;
      const scenery = state[id];

      scenery.size = { width, height };
    },
  },
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.worldState.scenery);
  },
});

export const { setSceneryPosition, setScenerySize } = scenerySlice.actions;

export default scenerySlice.reducer;
