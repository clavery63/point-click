import { combineReducers } from 'redux';
import previewReducer from './previewReducer';
import editorStateReducer from './editorStateReducer';
import gameStateReducer from './gameStateReducer';
import gameNameReducer from './gameNameReducer';

const rootReducer = combineReducers({
  previewState: previewReducer,
  gameName: gameNameReducer,
  gameState: gameStateReducer,
  editorState: editorStateReducer,
});

export default rootReducer;
