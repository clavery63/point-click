import selectObjectReducer from './selectObjectReducer';
import selectVerbReducer from './selectVerbReducer';
import selectItemReducer from './selectItemReducer';
import selectBagReducer from './selectBagReducer';
import setPositionReducer from './setPositionReducer';
import startGameReducer from './startGameReducer';
import { setValue, clearValue, keepState, updateValue } from './utils';
import { compose } from 'redux';

const roomReducer = payload => compose(
  setValue('playerState.room')(payload),
  updateValue('playerState.bagLevel')(level => level + 1),
  setValue(`gameState.rooms.${payload}.initialDescription`)(null)
);

const ITEMS_PER_PAGE = 7;

const changePageReducer = (payload, playerState) => {
  const { items, page } = playerState;
  switch (payload) {
    case 'DOWN':
      const newPage = Math.min(page + 1, Math.floor((items.length - 1) / ITEMS_PER_PAGE));
      return setValue('playerState.page')(newPage);
    case 'UP':
      return setValue('playerState.page')(Math.max(page - 1, 0));
    default:
      return keepState;
  }
};

const reducers = {
  SET_STATE: payload => () => payload,
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
  START_GAME: startGameReducer,
  SELECT_BAG: selectBagReducer,
  CHANGE_PAGE: changePageReducer
};

const rootReducer = (state = {}, { type, payload }) => {
  const { gameState, playerState } = state;
  const reducer = reducers[type] || keepState;
  return reducer(payload, playerState, gameState)(state);
};

export default rootReducer;
