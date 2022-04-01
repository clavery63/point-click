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
    colors: {
      background: '',
    },
    positions: {
      verbs: [
        { left: 15, top: 7 },
        { left: 68, top: 15 },
        { left: 68, top: 31 },
        { left: 68, top: 47 },
        { left: 68, top: 63 },
        { left: 118, top: 15 },
        { left: 118, top: 31 },
        { left: 118, top: 47 },
        { left: 118, top: 63 },
      ],
      pageDown: { left: 175, top: 15 },
      pageUp: { left: 175, top: 31 },
      self: { left: 175, top: 47 },
      save: { left: 175, top: 63 },
      miniMap: { left: 15, top: 23 },
    },
  },
  images: new Map(),
};

export default defaultState;
