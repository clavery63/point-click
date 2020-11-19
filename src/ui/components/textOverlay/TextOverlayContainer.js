import { connect } from 'react-redux';
import TextOverlay from './TextOverlay';

const mapStateToProps = ({ text, gameState }) => {
  return { 
    lines: text || null,
    hrImg: gameState.images.line
  };
};

const mapDispatchToProps = {
  onClick: () => ({ type: 'PAGE_CLICK' })
};

export default connect(mapStateToProps, mapDispatchToProps)(TextOverlay);
