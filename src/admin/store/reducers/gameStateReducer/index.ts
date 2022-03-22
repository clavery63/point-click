import { combineReducers } from 'redux';
import worldStateReducer from './worldStateReducer';
import playerStateReducer from './playerStateReducer';
import imagesReducer from './imagesReducer';
import flagsReducer from './flagsReducer';
import verbNamesReducer from './verbNamesReducer';
import friendlyNameReducer from './friendlyNameReducer';

export default combineReducers({
  worldState: worldStateReducer,
  playerState: playerStateReducer,
  images: imagesReducer,
  flags: flagsReducer,
  verbNames: verbNamesReducer,
  friendlyName: friendlyNameReducer,
});
