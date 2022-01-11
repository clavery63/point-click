import selectObjectReducer from './selectObjectReducer';
import selectVerbReducer from './selectVerbReducer';
import selectItemReducer from './selectItemReducer';
import selectBagReducer from './selectBagReducer';
import setPositionReducer from './setPositionReducer';
import changePageReducer from './changePageReducer';
import roomReducer from './roomReducer';
import { setValue, clearValue } from './utils';
import { Reducer as ReduxReducer } from 'redux';
import { Flags, GameStoreState, PlayerState, WorldState, EntityType, Item, DoorDir, Menu } from '../types';
import defaultState from '../defaultState';
import { ParentReducer } from 'shared/util/types';

type PositionType = {
  x: string,
  y: string,
  id: number,
  type: EntityType
};

export type ObjectType = {
  id: number,
  type: EntityType
};

type ActionTypes = {
  SET_STATE: GameStoreState,
  SET_WORLD_STATE: WorldState,
  SET_PLAYER_STATE: PlayerState,
  SET_FLAGS: Flags,
  SET_TEXT: string,
  SET_ROOM: number,
  SET_FRAME: number,
  SET_CURSOR_ENABLED: boolean,
  SET_POSITION: PositionType,
  CLEAR_NEXT_TEXT: null,
  CLEAR_TRANSITION_DEST: null,
  SELECT_VERB: string,
  SELECT_OBJECT: ObjectType,
  SELECT_ITEM: number,
  SELECT_BAG: number,
  CHANGE_PAGE: DoorDir,
  SET_MENU: Menu
}

type ActionsType = {
  [Key in keyof ActionTypes]: {
    type: Key,
    payload: ActionTypes[Key]
  }
}[keyof ActionTypes]

const applyReducer = <
  PayloadType
>(reducer: ParentReducer<PayloadType>, state: GameStoreState, payload: PayloadType) => {
  return reducer(payload, state.playerState, state.worldState, state.flags)(state);
};

const setState: ParentReducer<GameStoreState> = payload => () => payload;
const setWorldState: ParentReducer<WorldState> = setValue('worldState');
const setPlayerState: ParentReducer<PlayerState> = setValue('playerState');
const setFlags: ParentReducer<Flags> = setValue('flags');
const setText: ParentReducer<string> = setValue('text');
const setRoom: ParentReducer<number> = roomReducer;
const setFrame: ParentReducer<number> = setValue('transition.frame');
const setCursorEnabled: ParentReducer<boolean> = setValue('cursorEnabled');
const setPosition: ParentReducer<PositionType> = setPositionReducer;
const clearNextText: ParentReducer<null> = () => clearValue('nextText');
const clearTransitionDest: ParentReducer<null> = () => clearValue('transition.dest');
const selectVerb: ParentReducer<string> = selectVerbReducer;
const selectObject: ParentReducer<ObjectType> = selectObjectReducer;
const selectItem: ParentReducer<number> = selectItemReducer;
const selectBag: ParentReducer<number> = selectBagReducer;
const changePage: ParentReducer<DoorDir> = changePageReducer;
const setMenu: ParentReducer<Menu> = setValue('menu');

const rootReducer: ReduxReducer<GameStoreState, ActionsType> = (state = defaultState, action) => {
  /**
   * README:
   * 
   * This insanity is here to appease typescript, which is only smart enough to
   * deduce the action type/payload pairing if we use explicit control-flow.
   * Ordinarily, we would be able to simplify this function by putting the
   * reducers in a map, but the type checker won't allow it.
   * 
   * I think it's worth keeping in order to get good compile-time checking.
   * Ugly as it is, your IDE will make it pretty clear what needs to be added.
   * 
   * Right now this list of reducers is written out three times to fit these
   * needs. I'm hoping we can get it down to two at least (perhaps by inferring
   * the action types).
   */
  switch (action.type) {
    case 'SET_STATE':
      return applyReducer(setState, state, action.payload);
    case 'SET_WORLD_STATE':
      return applyReducer(setWorldState, state, action.payload);
    case 'SET_PLAYER_STATE':
      return applyReducer(setPlayerState, state, action.payload);
    case 'SET_FLAGS':
      return applyReducer(setFlags, state, action.payload);
    case 'SET_TEXT':
      return applyReducer(setText, state, action.payload);
    case 'SET_ROOM':
      return applyReducer(setRoom, state, action.payload);
    case 'SET_FRAME':
      return applyReducer(setFrame, state, action.payload);
    case 'SET_CURSOR_ENABLED':
      return applyReducer(setCursorEnabled, state, action.payload);
    case 'SET_POSITION':
      return applyReducer(setPosition, state, action.payload);
    case 'CLEAR_NEXT_TEXT':
      return applyReducer(clearNextText, state, action.payload);
    case 'CLEAR_TRANSITION_DEST':
      return applyReducer(clearTransitionDest, state, action.payload);
    case 'SELECT_VERB':
      return applyReducer(selectVerb, state, action.payload);
    case 'SELECT_OBJECT':
      return applyReducer(selectObject, state, action.payload);
    case 'SELECT_ITEM':
      return applyReducer(selectItem, state, action.payload);
    case 'SELECT_BAG':
      return applyReducer(selectBag, state, action.payload);
    case 'CHANGE_PAGE':
      return applyReducer(changePage, state, action.payload);
    case 'SET_MENU':
      return applyReducer(setMenu, state, action.payload);
    default:
      return state;
  }
};

export default rootReducer;
