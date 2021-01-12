import selectObjectReducer from './selectObjectReducer';
import selectVerbReducer from './selectVerbReducer';
import selectItemReducer from './selectItemReducer';
import setPositionReducer from './setPositionReducer';
import startGameReducer from './startGameReducer';
import { setValue, clearValue, keepState } from './utils';

const reducers = {
  SET_STATE: payload => () => payload,
  SET_TEXT: setValue('text'),
  SET_ROOM: setValue('playerState.room'),
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
};

const rootReducer = (state = {}, { type, payload }) => {
  const reducer = reducers[type] || keepState;
  console.log(reducer)
  return reducer(payload)(state);
};

export default rootReducer;
