import { connect } from 'react-redux';
import TextOverlay from './TextOverlay';

const mapStateToProps = ({ text, gameState }) => {
  return { 
    lines: text || null,
    hrImg: gameState.images.line
  };
};

export default connect(mapStateToProps)(TextOverlay);
