import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import Menu from './Menu';

const getText = state => state.text;
const getDoors = state => state.gameState.doors;
const getRooms = state => state.gameState.rooms;
const getPlayerRoom = state => state.playerState.room;
const hasText = createSelector([getText], text => text !== null);
const revealedDoors = createSelector(
  [getDoors, getRooms, getPlayerRoom], 
  (doors, rooms, playerRoom) => {
    const doorIds = rooms[playerRoom].doors;
    return doorIds
      .map(id => ({ ...doors[id], id }))
      .filter(door => !door.hidden);
  }
);

const mapStateToProps = state => {
  const { gameState, playerState } = state;

  return { 
    currentVerb: playerState.verb,
    hasText: hasText(state),
    doors: revealedDoors(state),
    menuImg: gameState.images.menu,
    menuButtonImg: gameState.images.menuButton
  };
};

const mapDispatchToProps = {
  dispatchVerb: verb => ({ type: 'SELECT_VERB', payload: verb }),
  dispatchDoor: id => ({ 
    type: 'SELECT_OBJECT', 
    payload: { id, type: 'doors' } 
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
