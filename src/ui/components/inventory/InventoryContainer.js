import { connect } from 'react-redux';
import Inventory from './Inventory';

const addItems = (examining, gameState) => {
  if (!examining) {
    return null;
  }
  /**
   * TODO: player can be examining items too
   */
  const object = gameState.scenery[examining];
  const contains = object.contains.map(id => gameState.items[id]);
  return { ...object, contains };
};

const mapStateToProps = ({ gameState, playerState }) => {
  const { items, page, using, examining } = playerState;
  const examiningWithItems = addItems(examining, gameState);
  return {
    items: items.map(id => ({ ...gameState.items[id], id })),
    page,
    inventoryImg: gameState.images.items,
    using,
    examining: examiningWithItems
  };
};

const mapDispatchToProps = {
  onClick: itemId => ({ type: 'SELECT_ITEM', payload: itemId })
};

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
