import { combineReducers } from 'redux';
import selectedEntityReducer from './selectedEntityReducer';
import sceneryEditingReducer from './sceneryEditingReducer';
import uploadStateReducer from './uploadStateReducer';
import tooltipsReducer from './tooltipsReducer';

export default combineReducers({
  selectedEntity: selectedEntityReducer,
  sceneryEditing: sceneryEditingReducer,
  uploadState: uploadStateReducer,
  tooltips: tooltipsReducer,
});
