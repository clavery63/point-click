import { combineReducers } from 'redux';
import verbsReducer from './verbsReducer';
import friendlyNameReducer from './friendlyNameReducer';

export default combineReducers({
  verbs: verbsReducer,
  friendlyName: friendlyNameReducer,
});
