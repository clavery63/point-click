import { connect } from 'react-redux';
import Menu from './Menu';

const mapStateToProps = ({ text }) => {
  return { text };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
