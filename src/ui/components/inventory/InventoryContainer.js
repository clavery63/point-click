import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Inventory from './Inventory';

const getExamining = state => state.playerState.examining;
const getPlayerItems = state => state.playerState.items;
const getGameItems = state => state.gameState.items;
const getScenery = state => state.gameState.scenery;

const getItemObjects = createSelector(
  [getPlayerItems, getGameItems],
  (playerItems, gameItems) => playerItems.map(id => ({ ...gameItems[id], id }))
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
  const { gameState, playerState } = state;
  const { page, using } = playerState;
  return {
    items: getItemObjects(state),
    page,
    inventoryImg: gameState.images.items,
    using,
    examining: getExaminingWithItems(state)
  };
};

const mapDispatchToProps = {
  onClick: itemId => ({ type: 'SELECT_ITEM', payload: itemId })
};

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
