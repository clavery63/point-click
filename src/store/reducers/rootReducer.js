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
  updateValue('playerState.bagLevel')(level => level + 1)
);

const reducers = {
  SET_STATE: payload => () => payload,
  SET_TEXT: setValue('text'),
  SET_ROOM: roomReducer,
  SET_FRAME: setValue('transition.frame'),
  SET_CURSOR_POSITION: setValue('cursor.position'),
  SET_CURSOR_ENABLED: setValue('cursor.enabled'),
  SET_POSITION: setPositionReducer,
  CLEAR_NEXT_TEXT: clearValue('nextText'),
  CLEAR_TRANSITION_DEST: clearValue('transition.dest'),
  SELECT_VERB: selectVerbReducer,
  SELECT_OBJECT: selectObjectReducer,
  SELECT_ITEM: selectItemReducer,
  START_GAME: startGameReducer,
  SELECT_BAG: selectBagReducer,
};

const rootReducer = (state = {}, { type, payload }) => {
  const reducer = reducers[type] || keepState;
  return reducer(payload)(state);
};

export default rootReducer;
