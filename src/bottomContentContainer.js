import { connect } from 'react-redux'
import BottomContent from './bottomContent.jsx'

const showMenu = menu => ({
  type: 'SHOW_MENU',
  menu
});

const mapStateToProps = () => {};

const mapDispatchToProps = dispatch => {
  return {
    onMenuButton: menu => {
      dispatch(showMenu(menu))
    }
  }
};

const BottomContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomContent)

export default BottomContentContainer;
