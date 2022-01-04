import selectObjectReducer from './selectObjectReducer';
import selectVerbReducer from './selectVerbReducer';
import selectItemReducer from './selectItemReducer';
import selectBagReducer from './selectBagReducer';
import setPositionReducer from './setPositionReducer';
import changePageReducer from './changePageReducer';
import roomReducer from './roomReducer';
import { setValue, clearValue, keepState } from './utils';
import { Action, Reducer as ReduxReducer } from 'redux';
import { Flags, GameStoreState, PlayerState, WorldState, EntityType, Item, DoorDir, Menu } from '../types';
import { StateTransformer } from 'shared/util/types';
import defaultState from '../defaultState';

export type Reducer<PayloadType> = {
  (payload: PayloadType, playerState: PlayerState, worldState: WorldState, flags: Flags): StateTransformer;
}

type PositionType = {
  x: string,
  y: string,
  id: number,
  type: EntityType
};

type ObjectType = {
  id: number,
  type: EntityType
};

type ReducersType = {
  SET_STATE: Reducer<GameStoreState>,
  SET_WORLD_STATE: Reducer<WorldState>,
  SET_PLAYER_STATE: Reducer<PlayerState>,
  SET_FLAGS: Reducer<Flags>,
  SET_TEXT: Reducer<string>,
  SET_ROOM: Reducer<number>,
  SET_FRAME: Reducer<number>,
  SET_CURSOR_ENABLED: Reducer<boolean>,
  SET_POSITION: Reducer<PositionType>,
  CLEAR_NEXT_TEXT: Reducer<null>,
  CLEAR_TRANSITION_DEST: Reducer<null>,
  SELECT_VERB: Reducer<string>,
  SELECT_OBJECT: Reducer<ObjectType>,
  SELECT_ITEM: Reducer<Item>,
  SELECT_BAG: Reducer<number>,
  CHANGE_PAGE: Reducer<DoorDir>,
  SET_MENU: Reducer<Menu>
};

const reducers: ReducersType = {
  SET_STATE: payload => () => payload,
  SET_WORLD_STATE: setValue('worldState'),
  SET_PLAYER_STATE: setValue('playerState'),
  SET_FLAGS: setValue('flags'),
  SET_TEXT: setValue('text'),
  SET_ROOM: roomReducer,
  SET_FRAME: setValue('transition.frame'),
  SET_CURSOR_ENABLED: setValue('cursorEnabled'),
  SET_POSITION: setPositionReducer,
  CLEAR_NEXT_TEXT: () => clearValue('nextText'),
  CLEAR_TRANSITION_DEST: () => clearValue('transition.dest'),
  SELECT_VERB: selectVerbReducer,
  SELECT_OBJECT: selectObjectReducer,
  SELECT_ITEM: selectItemReducer,
  SELECT_BAG: selectBagReducer,
  CHANGE_PAGE: changePageReducer,
  SET_MENU: setValue('menu'),
};

export interface NumberAction extends Action<'SET_FRAME'> {
  payload: number
}

// TODO: It's lame that this works right now (since `dispatch` is not going to honor
// the NumberAction constraint automatically), but we I think we'll be able to 
// more-or-less emulate this behavior
const rootReducer: ReduxReducer<GameStoreState, NumberAction> = (state = defaultState, action) => {
  const { type, payload } = action;
  const { worldState, playerState, flags } = state;
  const reducer = reducers[type] || keepState;
  return reducer(payload, playerState, worldState, flags)(state);
};

export default rootReducer;
