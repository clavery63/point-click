import { createSelector } from 'reselect';
import { GameStoreState } from '../../store/types';

const ITEMS_PER_PAGE = 7;

const getPlayer = (state: GameStoreState) => state.playerState;
const getExamining = (state: GameStoreState) => state.playerState.examining;
const getGameItems = (state: GameStoreState) => state.worldState.items;
const getScenery = (state: GameStoreState) => state.worldState.scenery;

const getItemObjects = createSelector(
  [getPlayer, getGameItems],
  ({ items, page }, gameItems) => {
    return items
      .map(id => ({ ...gameItems[id], id }))
      .slice(page * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE + ITEMS_PER_PAGE);
  },
);

const getExaminingWithItems = createSelector(
  [getExamining, getGameItems, getScenery],
  (examining, gameItems, scenery) => {
    if (!examining) {
      return null;
    }
    /**
     * TODO: player can be examining items too
     */
    const object = scenery[examining];
    const contains = object.contains?.map(id => ({ ...gameItems[id], id }));
    return { ...object, contains };
  },
);

const inventorySelector = (state: GameStoreState) => {
  const { images, playerState } = state;
  const { using } = playerState;
  return {
    items: getItemObjects(state),
    inventoryImg: images.get('items'),
    using,
    examining: getExaminingWithItems(state),
  };
};

export default inventorySelector;
