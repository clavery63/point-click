import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';
import { Lookup, Room } from 'game/store/types';
import { deleteDoor } from './doorsReducer';
import { deleteEntity } from './entitiesReducer';

type RoomWithId = {
  id: number;
  room: Room;
};

type RoomWithItem = {
  roomId: number;
  itemId: number;
};

type RoomWithDoor = {
  roomId: number;
  doorId: number;
};

export type ReorderType = 'entities' | 'doors';

type Reordering = {
  roomId: number;
  entityId: number;
  direction: 'UP' | 'DOWN';
  type: ReorderType;
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
    addItemToRoom: (state, action: PayloadAction<RoomWithItem>) => {
      const { roomId, itemId } = action.payload;

      state[roomId].entities.push(itemId);
    },
    addDoorToRoom: (state, action: PayloadAction<RoomWithDoor>) => {
      const { roomId, doorId } = action.payload;

      state[roomId].doors.push(doorId);
    },
    reorderEntity: (state, action: PayloadAction<Reordering>) => {
      const {
        roomId, entityId, type, direction,
      } = action.payload;
      const collection = state[roomId][type];
      const index = collection.indexOf(entityId);

      if (index < 0) {
        console.log(`damn, coudn't find ${type} ${entityId} in room ${roomId}`);
        return;
      }

      if (direction === 'DOWN') {
        swap(collection, index, Math.max(index - 1, 0));
      }

      if (direction === 'UP') {
        swap(collection, index, Math.min(index + 1, collection.length - 1));
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.worldState.rooms);
    builder.addCase(deleteEntity, (state, action) => {
      const { id, roomId } = action.payload;
      const room = state[roomId];
      room.entities = room.entities.filter((item: number) => item !== id);
    });
    builder.addCase(deleteDoor, (state, action) => {
      const { id, roomId } = action.payload;
      const room = state[roomId];
      room.doors = room.doors.filter((item: number) => item !== id);
    });
  },
});

export const {
  setRoom, reorderEntity, addItemToRoom, addDoorToRoom,
} = roomsSlice.actions;

export default roomsSlice.reducer;
