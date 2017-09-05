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
    case 'GO_TO_ROOM':
      return {
        ...state,
        currentRoom: action.dest
      }
    default:
      return state
  }
};

const text = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CHAR':
      return {
        ...state,
        char: action.char
      }
    case 'SET_LINE':
      return {
        ...state,
        char: 0,
        line: action.line
      }
    case 'CLEAR_TEXT':
      return {
        content: [],
        line: 0,
        char: 0
      }
    case 'GO_TO_ROOM':
      return {
        content: action.text,
        line: 0,
        char: 0
      }
    default:
      return state;
  }
}

const menu = (state = '', action) => {
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

const rooms = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const reducers = combineReducers({
  player,
  menu,
  ui,
  rooms,
  text
});

export default reducers;
