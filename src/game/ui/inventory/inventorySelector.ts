import { createSelector } from 'reselect';
import { GameStoreState, Item } from '../../store/types';

const ITEMS_PER_PAGE = 7;

const getPlayer = (state: GameStoreState) => state.playerState;
const getExamining = (state: GameStoreState) => state.playerState.examining;
const getEntities = (state: GameStoreState) => state.worldState.entities;

const getItemObjects = createSelector(
  [getPlayer, getEntities],
  ({ items, page }, entities) => {
    return items
      .map(id => entities[id])
      .slice(page * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE + ITEMS_PER_PAGE);
  },
);

const getExaminingWithItems = createSelector(
  [getExamining, getEntities],
  (examining, entities) => {
    if (!examining) {
      return null;
    }
    const object = entities[examining];
    const contains = object.contains?.map(id => entities[id]) as Item[];
    return { ...object, contains };
  },
);

const inventorySelector = (state: GameStoreState) => {
  const { images, playerState } = state;
  const { using } = playerState;

  // TODO: fix the typecasts in this file, either by treating Item and Scenery
  // More as the same thing, or by introducing helper functions with control
  // flow that help typescript narrow the types properly.

  return {
    items: getItemObjects(state) as Item[],
    inventoryImg: images.get('items'),
    using,
    examining: getExaminingWithItems(state),
  };
};

export default inventorySelector;
