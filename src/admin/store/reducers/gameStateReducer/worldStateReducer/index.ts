import { combineReducers } from 'redux';
import doorsReducer from './doorsReducer';
import roomsReducer from './roomsReducer';
import sceneryReducer from './sceneryReducer';
import itemsReducer from './itemsReducer';

export default combineReducers({
  doors: doorsReducer,
  rooms: roomsReducer,
  scenery: sceneryReducer,
  items: itemsReducer,
});
