import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';
import { Item, Lookup, Scenery } from 'game/store/types';

type PositionWithId = {
  id: number;
  x: number;
  y: number;
  field?: 'startPosition' | 'endPosition';
};

type EntityWithId = {
  entity: Item | Scenery;
  id: number;
};

type SizeWithId = {
  id: number;
  width: number;
  height: number;
};

const initialState: Lookup<Item | Scenery> = {};

export const entitiesSlice = createSlice({
  name: 'entities',
  initialState,
  reducers: {
    setEntityPosition: (state, action: PayloadAction<PositionWithId>) => {
      const {
        id, x, y, field,
      } = action.payload;
      const entity = state[id];

      if (entity.type === 'items' && entity.position) {
        entity.position = { left: x, top: y };
      }

      if (entity.type === 'scenery' && !!field) {
        entity[field] = { left: x, top: y };
      }
    },
    setScenerySize: (state, action: PayloadAction<SizeWithId>) => {
      const { id, width, height } = action.payload;
      const scenery = state[id];

      if (scenery.type === 'scenery') {
        scenery.size = { width, height };
      }
    },
    setEntity: (state, action: PayloadAction<EntityWithId>) => {
      const { id, entity } = action.payload;

      state[id] = entity;
    },
    deleteEntity: (state, action: PayloadAction<{ id: number; roomId: number }>) => {
      const { id } = action.payload;

      delete state[id];
    },
    createItemWithId: (state, action: PayloadAction<{ id: number}>) => {
      const { id } = action.payload;

      state[id] = {
        id,
        type: 'items',
        name: 'New Item',
        description: '',
        contains: null,
        // TODO: don't set position for items that don't render in viewport
        position: {
          left: 0,
          top: 0,
        },
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.worldState.entities);
  },
});

export const {
  setEntityPosition, setScenerySize, setEntity, createItemWithId, deleteEntity,
} = entitiesSlice.actions;

export default entitiesSlice.reducer;
