import { connect } from 'react-redux';
import Home from './Home';

const mapStateToProps = ({ showPreview }) => {
  return {
    showPreview,
  };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
