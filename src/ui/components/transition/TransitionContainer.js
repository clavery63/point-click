import { connect } from 'react-redux';
import Transition from './Transition';

const mapStateToProps = ({ transition }) => {
  return { 
    transition,
  };
};

export default connect(mapStateToProps)(Transition);
