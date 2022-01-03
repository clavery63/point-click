import selectObjectReducer from './selectObjectReducer';
import selectVerbReducer from './selectVerbReducer';
import selectItemReducer from './selectItemReducer';
import selectBagReducer from './selectBagReducer';
import setPositionReducer from './setPositionReducer';
import changePageReducer from './changePageReducer';
import roomReducer from './roomReducer';
import { setValue, clearValue, keepState } from './utils';
import { Reducer as ReduxReducer } from 'redux';
import { Flags, GameStoreState, PlayerState, WorldState } from '../types';
import { StateTransformer } from 'shared/util/types';
import defaultState from '../defaultState';

export type Reducer = {
  (payload: any, playerState: PlayerState, worldState: WorldState, flags: Flags): StateTransformer;
}

type ReducersType = {
  [x: string]: Reducer
}
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

const rootReducer: ReduxReducer<GameStoreState> = (state = defaultState, { type, payload }) => {
  const { worldState, playerState, flags } = state;
  const reducer = reducers[type] || keepState;
  return reducer(payload, playerState, worldState, flags)(state);
};

export default rootReducer;
