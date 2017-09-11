import { combineReducers } from 'redux'

const player = (state = {}, action) => {
  switch (action.type) {
    case 'ITEM_TO_PLAYER':
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

const text = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CHAR':
      if (state.scrolling) {
        return {
          ...state,
          char: action.char
        };
      } else {
        return state;
      }
    case 'SET_LINE':
      if (state.scrolling) {
        return {
          ...state,
          char: 0,
          line: action.line
        };
      } else {
        return state;
      }
    case 'CLEAR_TEXT':
      const { content, line, char } = state;
      const lastLine = content.length - 1;
      const lastLineLength = content[content.length - 1].length;
      if (line === lastLine && char === lastLineLength) {
        return {
          content: [],
          line: 0,
          char: 0,
          scrolling: false
        }
      } else {
        return {
          ...state,
          char: lastLineLength,
          line: lastLine,
          scrolling: false
        }
      }
    case 'SET_TEXT':
      return {
        content: action.text,
        line: 0,
        char: 0,
        scrolling: true
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
    case 'START_TRANSITION':
      return {
        ...state,
        transition: {
          enabled: true,
          toRoom: action.dest,
          text: action.text,
          dir: action.dir
        }
      }
    case 'CLEAR_TRANSITION':
      return {
        ...state,
        transition: {
          enabled: false,
          toRoom: 0,
          text: ''
        }
      }
    default:
      return state;
  }
};

const rooms = (state = {}, action) => {
  switch (action.type) {
    case 'ITEM_TO_PLAYER':
      const currentRoom = state[state.current];
      return {
        ...state,
        [state.current]: {
          ...currentRoom,
          items: currentRoom.items.filter(({ name }) => name !== action.name)
        }
      }
    case 'SET_ROOM':
      return {
        ...state,
        current: action.room
      }
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
