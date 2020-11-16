import { connect } from 'react-redux';
import Menu from './Menu';

const mapStateToProps = ({ text, gameState, playerState }) => {
  const { images, rooms } = gameState;
  const { room, verb } = playerState;
  const { doors } = rooms[room];

  return { 
    currentVerb: verb,
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
  dispatchVerb: verb => ({ type: 'SELECT_VERB', payload: verb }),
  dispatchDoor: id => ({ type: 'DOOR', payload: id })
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
