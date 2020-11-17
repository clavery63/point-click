import { connect } from 'react-redux';
import Viewport from './Viewport';

const mapStateToProps = ({ gameState, playerState }) => {
  const { images, rooms } = gameState;
  const { room } = playerState;
  const { name, doors, items, scenery } = rooms[room];

  return {
    doors: doors.map(id => ({
      id,
      ...gameState.doors[id], 
      type: 'doors', 
      img: images[gameState.doors[id].name]
    })),
    items: items.map(id => ({
      id,
      ...gameState.items[id], 
      type: 'items', 
      img: images[gameState.items[id].name] 
    })),
    scenery: scenery.map(id => ({
      id,
      ...gameState.scenery[id], 
      type: 'scenery', 
      img: images[gameState.scenery[id].name] 
    })),
    borderImg: images.border,
    roomImg: images[name]
  };
};

const mapDispatchToProps = {
  onClick: (id, type) => ({ 
    type: 'SELECT_OBJECT', 
    payload: { id, type }
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(Viewport);
