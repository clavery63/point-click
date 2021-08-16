import { connect } from 'react-redux';
import Home from './Home';

const mapStateToProps = ({ showPreview }) => {
  return {
    showPreview
  };
};

const mapDispatchToProps = {
  togglePreview: () => ({ type: 'TOGGLE_PREVIEW' })
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
