import { connect } from 'react-redux';
import Viewport from './Viewport';

const mapStateToProps = ({ gameState }) => {
  return {
    borderImg: gameState.images.border
  };
};

const mapDispatchToProps = {
  onClick: object => ({ type: 'OBJECT_CLICK', payload: object })
};

export default connect(mapStateToProps, mapDispatchToProps)(Viewport);
