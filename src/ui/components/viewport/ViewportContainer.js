import { connect } from 'react-redux';
import Viewport from './Viewport';

const withImage = (gameState, collection) => id => {
  const object = gameState[collection][id];
  const img = gameState.images[object.img];
  return { ...object, img, id };
};

const mapStateToProps = ({ gameState, playerState }) => {
  const { images, rooms } = gameState;
  const { room } = playerState;
  const { img, doors, items, scenery } = rooms[room];
  const visibleDoors = doors.filter(id => !!gameState.doors[id].img);

  return {
    doors: visibleDoors.map(withImage(gameState, 'doors')),
    items: items.map(withImage(gameState, 'items')),
    scenery: scenery.map(withImage(gameState, 'scenery')),
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
