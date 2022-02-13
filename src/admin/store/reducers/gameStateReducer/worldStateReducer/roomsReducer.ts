import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';
import { Lookup, Room } from 'game/store/types';

type RoomWithId = {
  id: number;
  room: Room;
};

type Reordering = {
  roomId: number;
  entityId: number;
  direction: 'UP' | 'DOWN';
};

const swap = (list: any[], indexOne: number, indexTwo: number) => {
  const temp = list[indexOne];
  list[indexOne] = list[indexTwo];
  list[indexTwo] = temp;
};

const initialState: Lookup<Room> = {};

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<RoomWithId>) => {
      const { id, room } = action.payload;

      state[id] = room;
    },
    reorderScenery: (state, action: PayloadAction<Reordering>) => {
      const { roomId, entityId, direction } = action.payload;
      const { scenery } = state[roomId];
      const entityIndex = scenery.indexOf(entityId);

      if (entityIndex < 0) {
        console.log(`damn, coudn't find scenery ${entityId} in room ${roomId}`);
        return;
      }

      if (direction === 'DOWN') {
        swap(scenery, entityIndex, Math.max(entityIndex - 1, 0));
      }

      if (direction === 'UP') {
        swap(scenery, entityIndex, Math.min(entityIndex + 1, scenery.length - 1));
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.worldState.rooms);
  },
});

export const { setRoom, reorderScenery } = roomsSlice.actions;

export default roomsSlice.reducer;
