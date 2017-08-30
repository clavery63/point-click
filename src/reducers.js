import { combineReducers } from 'redux'

const mode = (state = 'MENU', action) => {
  switch (action.type) {
    case 'SWITCH_MODE':
      return action.mode;
    default:
      return state
  }
}

const items = (state = [
    'torch',
    'key1',
    'pot roast',
    'key2'
], action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return [
        ...state,
        action.name
      ]
    default:
      return state
  }
}

const reducers = combineReducers({ items, mode });

export default reducers;
