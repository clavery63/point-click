import { connect } from 'react-redux';
import Cursor from './Cursor';

const mapStateToProps = ({ cursorEnabled, images }) => {
  return {
    cursorEnabled,
    cursorImg: images.cursor
  };
};

const mapDispatchToProps = {
  enableCursor: () => ({ type: 'SET_CURSOR_ENABLED', payload: true})
}

export default connect(mapStateToProps, mapDispatchToProps)(Cursor);
