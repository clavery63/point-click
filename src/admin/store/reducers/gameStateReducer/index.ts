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

// This is how we ensure a bunch of actions taken in quick succession get placed
// in the same undo state, for efficiency. For example, if you're typing,
// undo will remove a chunk of characters instead of each one individually
let switchGroups = true;
let curGroup = 0;
const groupBy = () => {
  if (switchGroups) {
    curGroup += 1;
    window.setTimeout(() => {
      switchGroups = true;
    }, 2000);
  }

  switchGroups = false;

  return curGroup;
};

export default undoable(gameStateReducer, {
  groupBy,
  ignoreInitialState: true,
  limit: 50,
});
