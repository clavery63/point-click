import { connect } from 'react-redux';
import Inventory from './Inventory';

const mapStateToProps = ({ gameState, playerState }) => {
  const { items, page, using } = playerState;
  return {
    items: items.map(id => ({ ...gameState.items[id], id })),
    page,
    inventoryImg: gameState.images.items,
    using
  };
};

const mapDispatchToProps = {
  onClick: itemId => ({ type: 'SELECT_ITEM', payload: itemId })
};

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
