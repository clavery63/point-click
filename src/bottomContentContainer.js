import { connect } from 'react-redux'
import BottomContent from './bottomContent.jsx'

const showMenu = menu => ({
  type: 'SHOW_MENU',
  menu
});

const startTransition = (dest, dir, text) => ({
  type: 'START_TRANSITION',
  dest,
  dir,
  text
});

const mapStateToProps = ({ rooms, player }) => {
  const { doors, items, name } = rooms[rooms.current];
  return {
    doors,
    rooms
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onMenuButton: menu => {
      dispatch(showMenu(menu))
    },
    onDoorClick: (dest, dir, text) => {
      dispatch(startTransition(dest, dir, text));
    }
  }
};

const BottomContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomContent)

export default BottomContentContainer;
