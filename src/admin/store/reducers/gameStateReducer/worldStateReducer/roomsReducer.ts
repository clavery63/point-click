import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';
import { Lookup, Room } from 'game/store/types';

type RoomWithId = {
  id: number,
  room: Room,
}

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {} as Lookup<Room>,
  reducers: {
    setRoom: (state, action: PayloadAction<RoomWithId>) => {
      return {
        ...state,
        [action.payload.id]: action.payload.room
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.worldState.rooms);
  }
});

export const { setRoom } = roomsSlice.actions;

export default roomsSlice.reducer;
