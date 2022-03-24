import { GameStoreState, DoorDir } from './types';

// TODO: I know this looks bad, but we're leaving it here for now to keep things
// moving. I think it would be nice to fetch the initial state before calling
// rootReducer and validate that at run time. Then we won't need to apply this
// defaultState ever. For now, what this gets us is ensuring only a valid GameState
// can ever be flowing through the reducers...
const defaultState: GameStoreState = {
  transition: {
    dest: null,
    dir: DoorDir.FORWARD,
  },
  transient: {
    nextText: '',
    nextMusic: {
      fileName: null,
    },
  },
  text: null,
  loading: true,
  cursorEnabled: false,
  gameName: '',
  menu: 'MAIN',
  playerState: {
    verb: 1,
    examining: null,
    room: 0,
    items: [],
    page: 0,
  },
  worldState: {
    entities: {},
    rooms: {},
    doors: {},
  },
  flags: [],
  config: {
    friendlyName: '',
    verbs: [],
    img: {},
    positions: {},
  },
  images: new Map(),
};

export default defaultState;
