import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';
import {
  Item, Lookup, Scenery, VerbIndex, VerbLogic,
} from 'game/store/types';

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

type EntityTypeWithId = {
  type: 'items' | 'scenery';
  id: number;
};

type SizeWithId = {
  id: number;
  width: number;
  height: number;
};

type EntityVerb = {
  id: number;
  verbIndex: VerbIndex;
  verbLogics: VerbLogic[];
};

const defaultSize = {
  width: 10,
  height: 10,
};

const createItem = (state: Lookup<Item | Scenery>, id: number) => {
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
};

const createScenery = (state: Lookup<Item | Scenery>, id: number) => {
  state[id] = {
    id,
    type: 'scenery',
    name: 'New Scenery',
    description: '',
    contains: null,
    // TODO: don't set position for items that don't render in viewport
    startPosition: {
      left: 0,
      top: 0,
    },
    size: defaultSize,
  };
};

const addDefaultSize = (scenery: Scenery) => {
  if (!scenery.img && !scenery.size) {
    scenery.size = defaultSize;
  }
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
    setEntityVerb: (state, action: PayloadAction<EntityVerb>) => {
      const { id, verbIndex, verbLogics } = action.payload;
      const newVerbs = {
        ...state[id].verbs,
        [verbIndex]: verbLogics,
      };
      state[id].verbs = newVerbs;
    },
    setEntity: (state, action: PayloadAction<EntityWithId>) => {
      const { id, entity } = action.payload;

      if (entity.type === 'scenery') {
        addDefaultSize(entity);
      }

      state[id] = entity;
    },
    deleteEntity: (state, action: PayloadAction<{ id: number; roomId?: number }>) => {
      const { id } = action.payload;

      delete state[id];
    },
    createEntity: (state, action: PayloadAction<EntityTypeWithId>) => {
      const { id, type } = action.payload;

      if (type === 'items') {
        createItem(state, id);
      }

      if (type === 'scenery') {
        createScenery(state, id);
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.worldState.entities);
  },
});

export const {
  setEntityPosition,
  setScenerySize,
  setEntity,
  createEntity,
  deleteEntity,
  setEntityVerb,
} = entitiesSlice.actions;

export default entitiesSlice.reducer;
