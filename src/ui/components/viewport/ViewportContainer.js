import { connect } from 'react-redux';
import Viewport from './Viewport';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  onClick: object => ({ type: 'OBJECT_CLICK', payload: object })
};

export default connect(mapStateToProps, mapDispatchToProps)(Viewport);
