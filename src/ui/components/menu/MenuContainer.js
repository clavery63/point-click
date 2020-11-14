import { connect } from 'react-redux';
import Menu from './Menu';

const mapStateToProps = ({ text, menuOption }) => {
  return { text, menuOption };
};

const mapDispatchToProps = {
  dispatchMove: () => ({ type: 'MENU_OPTION', payload: 'MOVE' }),
  dispatchMap: coords => ({ type: 'MAP', payload: coords })
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
