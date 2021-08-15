import { connect } from 'react-redux';
import OuterMenu from './OuterMenu';

const mapStateToProps = ({ menu }) => {
  return {
    menu
  };
};

const mapDispatchToProps = {
  onStartClick: () => ({ type: 'START_GAME' }),
  onLoadClick: () => ({ type: 'LOAD_GAME' })
};

export default connect(mapStateToProps, mapDispatchToProps)(OuterMenu);
