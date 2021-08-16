import { connect } from 'react-redux';
import Home from './Home';

const mapStateToProps = ({ counter }) => {
  return {
    counter
  };
};

const mapDispatchToProps = {
  incrementCounter: () => ({ type: 'INCREMENT_COUNTER' })
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
