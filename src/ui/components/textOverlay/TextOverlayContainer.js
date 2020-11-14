import { connect } from 'react-redux';
import TextOverlay from './TextOverlay';

const shift = ' '.charCodeAt(0);

const mapStateToProps = ({ text }) => {
  const lines = text.map(str => {
    const upper = str.toUpperCase();
    return upper.split('').map(char => char.charCodeAt(0) - shift);
  });
  return { lines };
};

export default connect(mapStateToProps)(TextOverlay);
