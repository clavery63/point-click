import { combineReducers } from 'redux';
import selectedEntityReducer from './selectedEntityReducer';
import uploadStateReducer from './uploadStateReducer';

export default combineReducers({
  selectedEntity: selectedEntityReducer,
  uploadState: uploadStateReducer,
});
