import { connect } from 'react-redux'
import MainMenu from './mainMenu.jsx'

const hideMenu = menu => ({
  type: 'SHOW_MENU',
  menu: 'NONE'
});

const mapStateToProps = (state) => {
  const { menu } = state;
  return { menu }
};

const mapDispatchToProps = dispatch => {
  return {
    onMenuButton: menu => {
      dispatch(hideMenu())
    }
  }
};

const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMenu)

export default MenuContainer;
