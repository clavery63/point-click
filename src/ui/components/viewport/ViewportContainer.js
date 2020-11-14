import { connect } from 'react-redux';
import Viewport from './Viewport';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onClick: () => {}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Viewport);
