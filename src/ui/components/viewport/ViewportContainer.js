import { connect } from 'react-redux';
import Viewport from './Viewport';

const renderFns = {
  items: ({ img }) => () => img,
  scenery: ({ img }) => () => img,
  doors: ({ img, state }) => () => {
    return state === 'OPEN' ? null : img
  }
};

const collectProps = (gameState, type) => id => {
  const object = {
    ...gameState[type][id],
    id,
    type,
    img: gameState.images[gameState[type][id].img] 
  };
  return {
    ...object,
    render: renderFns[type](object)
  }
};

const mapStateToProps = ({ gameState, playerState }) => {
  const { images, rooms } = gameState;
  const { room } = playerState;
  const { img, doors, items, scenery } = rooms[room];
  const visibleDoors = doors.filter(id => !!gameState.doors[id].img);

  return {
    doors: visibleDoors.map(collectProps(gameState, 'doors')),
    items: items.map(collectProps(gameState, 'items')),
    scenery: scenery.map(collectProps(gameState, 'scenery')),
    borderImg: images.border,
    roomImg: images[img]
  };
};

const mapDispatchToProps = {
  onClick: (id, type) => ({ 
    type: 'SELECT_OBJECT', 
    payload: { id, type }
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(Viewport);
