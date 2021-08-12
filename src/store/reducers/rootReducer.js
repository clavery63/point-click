import selectObjectReducer from './selectObjectReducer';
import selectVerbReducer from './selectVerbReducer';
import selectItemReducer from './selectItemReducer';
import selectBagReducer from './selectBagReducer';
import setPositionReducer from './setPositionReducer';
import { setValue, clearValue, keepState, updateValue } from './utils';
import { compose } from 'redux';

const roomReducer = payload => compose(
  setValue('playerState.room')(payload),
  updateValue('playerState.bagLevel')(level => level + 1),
  setValue(`gameState.rooms.${payload}.initialDescription`)(null)
);

const ITEMS_PER_PAGE = 7;

const changePageReducer = (direction, playerState) => {
  const { items, page, examining } = playerState;
  const lastPage = Math.floor((items.length - 1) / ITEMS_PER_PAGE);

  if (!!examining) {
    return setValue('playerState.examining')(null);
  }
  
  switch (direction) {
    case 'DOWN':
      const newPage = Math.min(page + 1, lastPage);
      return setValue('playerState.page')(newPage);
    case 'UP':
      return setValue('playerState.page')(Math.max(page - 1, 0));
    default:
      return keepState;
  }
};

const reducers = {
  SET_STATE: payload => () => payload,
  SET_GAME_STATE: setValue('gameState'),
  SET_PLAYER_STATE: setValue('playerState'),
  SET_FLAGS: setValue('flags'),
  SET_TEXT: setValue('text'),
  SET_ROOM: roomReducer,
  SET_FRAME: setValue('transition.frame'),
  SET_CURSOR_POSITION: setValue('cursor.position'),
  SET_CURSOR_ENABLED: setValue('cursor.enabled'),
  SET_POSITION: setPositionReducer,
  CLEAR_NEXT_TEXT: () => clearValue('nextText'),
  CLEAR_TRANSITION_DEST: () => clearValue('transition.dest'),
  SELECT_VERB: selectVerbReducer,
  SELECT_OBJECT: selectObjectReducer,
  SELECT_ITEM: selectItemReducer,
  SELECT_BAG: selectBagReducer,
  CHANGE_PAGE: changePageReducer,
  SET_MENU: setValue('menu')
};

const rootReducer = (state = {}, { type, payload }) => {
  const { gameState, playerState, flags } = state;
  const reducer = reducers[type] || keepState;
  return reducer(payload, playerState, gameState, flags)(state);
};

export default rootReducer;
