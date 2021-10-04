import { combineReducers } from 'redux';
import previewReducer from './previewReducer';
import selectedEntityReducer from './selectedEntityReducer';
import gameStateReducer from './gameStateReducer';

export default combineReducers({
  previewState: previewReducer,
  gameName: (state = '') => state,
  gameState: gameStateReducer,
  selectedEntity: selectedEntityReducer
});
