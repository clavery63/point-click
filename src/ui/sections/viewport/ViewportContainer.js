import { connect } from 'react-redux';
import Viewport from './Viewport';

const mapStateToProps = ({ fillColor, width }) => {
  return {
    fill: fillColor,
    width
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClick: () => {
      dispatch({ type: 'MAKE_RED' })
      dispatch({ type: 'EXPAND' })
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Viewport);
