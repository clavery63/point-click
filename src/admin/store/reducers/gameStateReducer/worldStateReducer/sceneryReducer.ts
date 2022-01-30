import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';
import { Scenery, Lookup } from 'game/store/types';

type PositionWithId = {
  id: number,
  x: number,
  y: number,
  field: 'startPosition' | 'endPosition'
}

type SizeWithId = {
  id: number,
  width: number,
  height: number
}

export const scenerySlice = createSlice({
  name: 'scenery',
  initialState: {} as Lookup<Scenery>,
  reducers: {
    setSceneryPosition: (state: Lookup<Scenery>, action: PayloadAction<PositionWithId>) => {
      const oldScenery = state[action.payload.id];
      return {
        ...state,
        [action.payload.id]: {
          ...oldScenery,
          [action.payload.field]: {
            ...oldScenery[action.payload.field],
            left: action.payload.x,
            top: action.payload.y,
          }
        }
      }
    },
    setScenerySize: (state, action: PayloadAction<SizeWithId>) => {
      // TODO: resize should also use SET_SCENERY_POSITION
      const oldScenery2 = state[action.payload.id];
      return {
        ...state,
        [action.payload.id]: {
          ...oldScenery2,
          startPosition: {
            ...oldScenery2.startPosition,
            width: action.payload.width,
            height: action.payload.height,
          }
        }
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.worldState.scenery);
  }
});

export const { setSceneryPosition, setScenerySize } = scenerySlice.actions;

export default scenerySlice.reducer;
