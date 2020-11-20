import selectObjectReducer from './selectObjectReducer';
import selectVerbReducer from './selectVerbReducer';
import selectItemReducer from './selectItemReducer';
import { setValue, clearValue, keepState } from './utils';

const reducers = {
  SET_STATE: payload => () => payload,
  SET_TEXT: setValue('text'),
  SET_ROOM: setValue('playerState.room'),
  SET_FRAME: val => state => {
    console.log('val:', val)
    return setValue('transition.frame')(val)(state)
  },
  CLEAR_NEXT_TEXT: clearValue('nextText'),
  CLEAR_TRANSITION_DEST: clearValue('transition.dest'),
  SELECT_VERB: selectVerbReducer,
  SELECT_OBJECT: selectObjectReducer,
  SELECT_ITEM: selectItemReducer
};

const rootReducer = (state = {}, { type, payload }) => {
  console.log(type)
  const reducer = reducers[type] || keepState;
  return reducer(payload)(state);
};

export default rootReducer;
