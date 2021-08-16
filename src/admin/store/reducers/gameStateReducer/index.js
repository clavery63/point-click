import { combineReducers } from 'redux';
import worldStateReducer from './worldStateReducer';
import playerStateReducer from './playerStateReducer';
import flagsReducer from './flagsReducer';

export default combineReducers({
  worldState: worldStateReducer,
  playerState: playerStateReducer,
  flags: flagsReducer,
});
