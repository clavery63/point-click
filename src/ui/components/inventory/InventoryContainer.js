import { connect } from 'react-redux';
import Inventory from './Inventory';

const mapStateToProps = ({ text, menuOption }) => {
  return { text, menuOption };
};

const mapDispatchToProps = {
  onClick: item => ({ type: 'ITEM_CLICK', payload: item })
};

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
