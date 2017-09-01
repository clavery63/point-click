import { combineReducers } from 'redux'

const player = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [
          ...state.items,
          action.name
        ]
      }
    default:
      return state
  }
};

const menu = (state = 'MENU', action) => {
  console.log(action)
  switch (action.type) {
    case 'SHOW_MENU':
      return action.menu;
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
  player,
  menu,
  ui,
  room
});

export default reducers;
