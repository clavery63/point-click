import { GameStoreState } from 'game/store/types';
import { createSelector } from 'reselect';

const getText = (state: GameStoreState) => state.text;
const getDoors = (state: GameStoreState) => state.worldState.doors;
const getRooms = (state: GameStoreState) => state.worldState.rooms;
const getPlayerRoom = (state: GameStoreState) => state.playerState.room;
const hasText = createSelector([getText], text => text !== null);
const revealedDoors = createSelector(
  [getDoors, getRooms, getPlayerRoom],
  (doors, rooms, playerRoom) => {
    const doorIds = rooms[playerRoom].doors;
    return doorIds
      .map(id => ({ ...doors[id], id }))
      .filter(door => !door.hidden);
  },
);

const menuSelector = (state: GameStoreState) => {
  const { images, playerState } = state;

  return {
    currentVerb: playerState.verb,
    hasText: hasText(state),
    doors: revealedDoors(state),
    menuImg: images.get('menu'),
    menuButtonImg: images.get('menu-button'),
  };
};

export default menuSelector;
