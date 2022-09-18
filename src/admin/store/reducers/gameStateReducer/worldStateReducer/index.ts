import { combineReducers } from 'redux';
import doorsReducer from './doorsReducer';
import roomsReducer from './roomsReducer';
import entitiesReducer from './entitiesReducer';
import dialogsReducer from './dialogsReducer';

export default combineReducers({
  doors: doorsReducer,
  rooms: roomsReducer,
  entities: entitiesReducer,
  dialogs: dialogsReducer,
});
