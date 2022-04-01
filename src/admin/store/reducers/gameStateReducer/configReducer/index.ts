import { combineReducers } from 'redux';
import verbsReducer from './verbsReducer';
import friendlyNameReducer from './friendlyNameReducer';
import imgReducer from './imgReducer';
import positionsReducer from './positionsReducer';
import colorsReducer from './colorsReducer';

export default combineReducers({
  verbs: verbsReducer,
  friendlyName: friendlyNameReducer,
  img: imgReducer,
  positions: positionsReducer,
  colors: colorsReducer,
});
