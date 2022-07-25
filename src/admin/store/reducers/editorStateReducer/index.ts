import { combineReducers } from 'redux';
import selectedEntityReducer from './selectedEntityReducer';
import sceneryEditingReducer from './sceneryEditingReducer';
import tooltipsReducer from './tooltipsReducer';
import miscInfoReducer from './miscInfoReducer';

export default combineReducers({
  selectedEntity: selectedEntityReducer,
  sceneryEditing: sceneryEditingReducer,
  tooltips: tooltipsReducer,
  miscInfo: miscInfoReducer,
});
