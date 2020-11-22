import { connect } from 'react-redux';
import Cursor from './Cursor';

const mapStateToProps = ({ cursor, gameState }) => {
  return {
    cursor,
    cursorImg: gameState.images.cursor
  };
};

export default connect(mapStateToProps)(Cursor);
