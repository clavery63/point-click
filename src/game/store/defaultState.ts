import { GameStoreState } from './types';

// TODO: I know this looks bad, but we're leaving it here for now to keep things
// moving. I think it would be nice to fetch the initial state before calling
// rootReducer and validate that at run time. Then we won't need to apply this
// defaultState ever. For now, what this gets us is ensuring only a valid GameState
// can ever be flowing through the reducers...
const defaultState: GameStoreState = {
  transition: {
    dest: 0,
    dir: 'FORWARD'
  },
  nextText: '',
  text: null,
  loading: true,
  cursorEnabled: false,
  gameName: '',
  menu: 'MAIN',
  playerState: {
    verb: 'LOOK',
    examining: null,
    room: 0,
    items: [],
    timer: 0,
    page: 0
  },
  worldState: {
    rooms: {},
    items: {},
    scenery: {},
    doors: {}
  },
  flags: new Set()
};

export default defaultState;
