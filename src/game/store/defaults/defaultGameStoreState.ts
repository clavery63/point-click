import { GameStoreState, DoorDir } from '../types';
import getDefaultGameState from './getDefaultGameState';

const defaultGameStoreState: GameStoreState = {
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
  menu: {
    current: 'TITLE',
  },
  images: new Map(),
  ...getDefaultGameState(''),
};

export default defaultGameStoreState;
