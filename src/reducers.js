import { combineReducers } from 'redux'

const items = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return [
        ...state,
        action.name
      ]
    default:
      return state
  }
};

const mode = (state = 'MENU', action) => {
  switch (action.type) {
    case 'SWITCH_MODE':
      return action.mode;
    default:
      return state;
  }
};

const ui = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PAGE':
      return {
        ...state,
        page: action.page
      };
    default:
      return state;
  }
};

const room = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const reducers = combineReducers({
  items,
  mode,
  ui,
  room
});

export default reducers;
