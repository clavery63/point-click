import { connect } from 'react-redux';
import TextOverlay from './TextOverlay';

const shift = ' '.charCodeAt(0);

const mapStateToProps = ({ text, gameState }) => {
  if (!text) return { lines: null };
  const lines = (text || []).map(str => {
    const upper = str.toUpperCase();
    return upper.split('').map(char => char.charCodeAt(0) - shift);
  });

  return { 
    lines,
    hrImg: gameState.images.line
  };
};

const mapDispatchToProps = {
  onClick: () => ({ type: 'PAGE_CLICK' })
};

export default connect(mapStateToProps, mapDispatchToProps)(TextOverlay);
