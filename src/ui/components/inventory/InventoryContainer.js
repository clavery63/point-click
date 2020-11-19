import { connect } from 'react-redux';
import Inventory from './Inventory';

const mapStateToProps = ({ gameState, playerState }) => {
  const { items, itemPage, using } = playerState;
  return {
    items: items.map(id => ({ ...gameState.items[id], id })),
    inventoryImg: gameState.images.items,
    using
  };
};

const mapDispatchToProps = {
  onClick: itemId => ({ type: 'ITEM_CLICK', payload: itemId })
};

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
