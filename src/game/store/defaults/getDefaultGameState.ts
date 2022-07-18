import { GameState } from '../types';
import defaultVerbs from './defaultVerbs';

type GetDefaultGameState = (friendlyName: string) => GameState;
const getDefaultGameState: GetDefaultGameState = friendlyName => ({
  worldState: {
    doors: {},
    entities: {},
    rooms: {},
  },
  playerState: {
    verb: 0,
    room: 0,
    page: 0,
    examining: null,
    items: [],
  },
  flags: [],
  config: {
    verbs: defaultVerbs,
    friendlyName,
    img: {},
    colors: {
      background: '#ebe6af',
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
});

export default getDefaultGameState;
