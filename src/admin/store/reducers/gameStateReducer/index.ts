import { combineReducers } from 'redux';
import undoable from 'redux-undo';
import worldStateReducer from './worldStateReducer';
import playerStateReducer from './playerStateReducer';
import flagsReducer from './flagsReducer';
import configReducer from './configReducer';

const gameStateReducer = combineReducers({
  worldState: worldStateReducer,
  playerState: playerStateReducer,
  flags: flagsReducer,
  config: configReducer,
});

export default undoable(gameStateReducer);
