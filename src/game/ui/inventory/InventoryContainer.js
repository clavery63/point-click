import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Inventory from './Inventory';

const ITEMS_PER_PAGE = 7;

const getPlayer = state => state.playerState;
const getExamining = state => state.playerState.examining;
const getGameItems = state => state.worldState.items;
const getScenery = state => state.worldState.scenery;

const getItemObjects = createSelector(
  [getPlayer, getGameItems],
  ({ items, page }, gameItems) => {
    return items
      .map(id => ({ ...gameItems[id], id }))
      .slice(page * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE + ITEMS_PER_PAGE);
  }
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
    const contains = object.contains.map(id => ({ ...gameItems[id], id }));
    return { ...object, contains };
  }
);

const mapStateToProps = (state) => {
  const { images, playerState } = state;
  const { page, using } = playerState;
  return {
    items: getItemObjects(state),
    page,
    inventoryImg: images.get('items'),
    using,
    examining: getExaminingWithItems(state)
  };
};

const mapDispatchToProps = {
  onClick: itemId => ({ type: 'SELECT_ITEM', payload: itemId })
};

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
