import { connect } from 'react-redux';
import TextOverlay from './TextOverlay';

const mapStateToProps = ({ text, images }) => {
  return { 
    lines: text || null,
    hrImg: images.line
  };
};

export default connect(mapStateToProps)(TextOverlay);
