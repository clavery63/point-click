import { connect } from 'react-redux';
import Cursor from './Cursor';

const mapStateToProps = ({ cursor, images }) => {
  return {
    cursor,
    cursorImg: images.cursor
  };
};

export default connect(mapStateToProps)(Cursor);
