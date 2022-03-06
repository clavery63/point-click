import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';
import defaultState from 'game/store/defaultState';
import { PlayerState } from 'game/store/types';
import { deleteEntity } from './worldStateReducer/entitiesReducer';

const initialState: PlayerState = defaultState.playerState;

export const playerStateSlice = createSlice({
  name: 'playerState',
  initialState,
  reducers: {
    setPlayer: (state, action: PayloadAction<{ player: PlayerState }>) => {
      const { player } = action.payload;

      return player;
    },
    addItemToPlayer: (state, action: PayloadAction<{ id: number}>) => {
      const { id } = action.payload;

      state.items.push(id);
    },
  },
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.playerState);
    builder.addCase(deleteEntity, (state, action) => {
      const { id, roomId } = action.payload;
      if (roomId === undefined) {
        state.items = state.items.filter((item: number) => item !== id);
      }
    });
  },
});

export const { setPlayer, addItemToPlayer } = playerStateSlice.actions;

export default playerStateSlice.reducer;
