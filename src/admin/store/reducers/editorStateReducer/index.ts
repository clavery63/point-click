import { combineReducers } from 'redux';
import selectedEntityReducer from './selectedEntityReducer';
import sceneryEditingReducer from './sceneryEditingReducer';
import tooltipsReducer from './tooltipsReducer';

export default combineReducers({
  selectedEntity: selectedEntityReducer,
  sceneryEditing: sceneryEditingReducer,
  tooltips: tooltipsReducer,
});
