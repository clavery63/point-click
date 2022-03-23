import { combineReducers } from 'redux';
import verbNamesReducer from './verbNamesReducer';
import friendlyNameReducer from './friendlyNameReducer';

export default combineReducers({
  verbNames: verbNamesReducer,
  friendlyName: friendlyNameReducer,
});
