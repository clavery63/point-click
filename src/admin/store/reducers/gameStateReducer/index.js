import { combineReducers } from 'redux';
import worldStateReducer from './worldStateReducer';
import playerStateReducer from './playerStateReducer';
import imagesReducer from './imagesReducer';
import flagsReducer from './flagsReducer';

export default combineReducers({
  worldState: worldStateReducer,
  playerState: playerStateReducer,
  images: imagesReducer,
  flags: flagsReducer,
});
