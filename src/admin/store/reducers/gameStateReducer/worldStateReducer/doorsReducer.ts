import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';
import {
  Door, DoorDir, DoorState, Lookup,
} from 'game/store/types';

type DoorWithId = {
  door: Door;
  id: number;
};

type PositionWithId = {
  id: number;
  x: number;
  y: number;
};

export const doorsSlice = createSlice({
  name: 'doors',
  initialState: {} as Lookup<Door>,
  reducers: {
    setDoor: (state, action: PayloadAction<DoorWithId>) => {
      const { id, door } = action.payload;

      state[id] = door;
    },
    setDoorPosition: (state, action: PayloadAction<PositionWithId>) => {
      const { id, x, y } = action.payload;
      const door = state[id];

      door.position = { left: x, top: y };
    },
    deleteDoor: (state, action: PayloadAction<{ id: number; roomId: number }>) => {
      const { id } = action.payload;

      delete state[id];
    },
    createDoorWithId: (state, action: PayloadAction<{ id: number}>) => {
      const { id } = action.payload;

      state[id] = {
        id,
        type: 'doors',
        position: {
          left: 0, top: 0,
        },
        mapPosition: {
          x: 0, y: 0,
        },
        dest: 0,
        dir: DoorDir.FORWARD,
        state: DoorState.CLOSED,
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.worldState.doors);
  },
});

export const {
  setDoor,
  deleteDoor,
  createDoorWithId,
  setDoorPosition,
} = doorsSlice.actions;

export default doorsSlice.reducer;
