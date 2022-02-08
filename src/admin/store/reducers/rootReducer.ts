import { combineReducers } from 'redux';
import previewReducer from './previewReducer';
import selectedEntityReducer from './selectedEntityReducer';
import gameStateReducer from './gameStateReducer';
import gameNameReducer from './gameNameReducer';

const rootReducer = combineReducers({
  previewState: previewReducer,
  gameName: gameNameReducer,
  gameState: gameStateReducer,
  selectedEntity: selectedEntityReducer,
});

export default rootReducer;
