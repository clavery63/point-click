import selectObjectReducer from './selectObjectReducer';
import selectVerbReducer from './selectVerbReducer';
import selectItemReducer from './selectItemReducer';
import { setValue, clearValue, keepState } from './utils';

const reducers = {
  SET_STATE: payload => () => payload,
  SET_TEXT: setValue('text'),
  CLEAR_NEXT_TEXT: clearValue('nextText'),
  SELECT_VERB: selectVerbReducer,
  SELECT_OBJECT: selectObjectReducer,
  SELECT_ITEM: selectItemReducer
};

const rootReducer = (state = {}, { type, payload }) => {
  const reducer = reducers[type] || keepState;
  return reducer(payload)(state);
};

export default rootReducer;
