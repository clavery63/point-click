import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';
import { Door, Lookup } from 'game/store/types';

type DoorWithId = {
  door: Door;
  id: number;
};

export const doorsSlice = createSlice({
  name: 'doors',
  initialState: {} as Lookup<Door>,
  reducers: {
    setDoor: (state, action: PayloadAction<DoorWithId>) => {
      const { id, door } = action.payload;

      state[id] = door;
    },
  },
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.worldState.doors);
  },
});

export const {
  setDoor,
} = doorsSlice.actions;

export default doorsSlice.reducer;
