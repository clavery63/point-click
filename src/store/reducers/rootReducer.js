import selectObjectReducer from './selectObjectReducer';
import selectVerbReducer from './selectVerbReducer';
import { setValue, clearValue } from './utils';

const reducers = {
  SET_STATE: (_, payload) => payload,
  SET_TEXT: setValue('text'),
  CLEAR_NEXT_TEXT: clearValue('nextText'),
  SELECT_VERB: selectVerbReducer,
  SELECT_OBJECT: selectObjectReducer
};

const rootReducer = (state = {}, { type, payload }) => {
  const reducer = reducers[type] || (() => state);
  return reducer(state, payload);
};

export default rootReducer;
