import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';
import {
  Item, Lookup, Scenery, VerbIndex, VerbLogic,
} from 'game/store/types';
import { deleteRoom } from './roomsReducer';

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
  isStatic: boolean;
};

type SizeWithId = {
  id: number;
  width: number;
  height: number;
};

type EntityVerb = {
  id: number;
  verbIndex: VerbIndex;
  verbLogics?: VerbLogic[];
};

type DeleteInfo = {
  id: number;
  roomId?: number;
  containerId?: number;
};

const defaultSize = {
  width: 10,
  height: 10,
};

const createItem = (state: Lookup<Item | Scenery>, id: number, isStatic: boolean) => {
  state[id] = {
    id,
    type: 'items',
    name: 'New Item',
    description: '',
    // TODO: don't set position for items that don't render in viewport
    position: {
      left: 0,
      top: 0,
    },
    isStatic,
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
      if (!verbLogics) {
        delete newVerbs[verbIndex];
      }
      state[id].verbs = newVerbs;
    },
    setEntity: (state, action: PayloadAction<EntityWithId>) => {
      const { id, entity } = action.payload;

      if (entity.type === 'scenery') {
        addDefaultSize(entity);
      }

      state[id] = entity;
    },
    deleteEntity: (state, action: PayloadAction<DeleteInfo>) => {
      const { id, containerId } = action.payload;

      if (containerId) {
        const container = state[containerId];
        container.contains = container.contains?.filter(itemId => itemId !== id);
      }

      delete state[id];
    },
    createEntity: (state, action: PayloadAction<EntityTypeWithId>) => {
      const { id, type, isStatic } = action.payload;

      if (type === 'items') {
        createItem(state, id, isStatic);
      }

      if (type === 'scenery') {
        createScenery(state, id);
      }
    },
    addItemToContainer: (state, action: PayloadAction<{ id: number; containerId: number }>) => {
      const { id, containerId } = action.payload;
      const contains = state[containerId].contains || [];

      state[containerId].contains = [...contains, id];
    },
  },
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.worldState.entities);
    builder.addCase(deleteRoom, (state, action) => {
      const entityIds = action.payload.room.entities;
      entityIds.forEach(id => {
        delete state[id];
      });
    });
  },
});

export const {
  setEntityPosition,
  setScenerySize,
  setEntity,
  createEntity,
  deleteEntity,
  setEntityVerb,
  addItemToContainer,
} = entitiesSlice.actions;

export default entitiesSlice.reducer;
