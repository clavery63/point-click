import { connect } from 'react-redux';
import Menu from './Menu';

const mapStateToProps = ({ text, menuOption, gameState, playerState }) => {
  const { images, rooms } = gameState;
  const { room } = playerState;
  const { doors } = rooms[room];

  /**
   * TODO: replace menuOption
   */
  return { 
    menuOption,
    text,
    doors: doors.map(id => ({
      id,
      position: gameState.doors[id].mapPosition
    })),
    menuImg: images.menu,
    menuButtonImg: images.menuButton
  };
};

const mapDispatchToProps = {
  dispatchMove: () => ({ type: 'MENU_OPTION', payload: 'MOVE' }),
  dispatchDoor: id => ({ type: 'DOOR', payload: id })
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
