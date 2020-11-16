import { connect } from 'react-redux';
import Inventory from './Inventory';

const mapStateToProps = ({  gameState }) => {
  return {
    inventoryImg: gameState.images.items
  };
};

const mapDispatchToProps = {
  onClick: item => ({ type: 'ITEM_CLICK', payload: item })
};

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
