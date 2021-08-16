import { combineReducers } from 'redux';
import previewReducer from './previewReducer';
import gameStateReducer from './gameStateReducer';

export default combineReducers({
  showPreview: previewReducer,
  gameName: (state = '') => state,
  gameState: gameStateReducer,
});
