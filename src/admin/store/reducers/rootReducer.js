import { combineReducers } from 'redux';
import previewReducer from './previewReducer';

export default combineReducers({
  showPreview: previewReducer
});
