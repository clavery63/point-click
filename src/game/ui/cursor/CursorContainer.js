import { connect } from 'react-redux';
import Cursor from './Cursor';

const mapStateToProps = ({ cursorEnabled, images }) => {
  return {
    cursorEnabled,
    cursorImg: images.cursor
  };
};

export default connect(mapStateToProps)(Cursor);
