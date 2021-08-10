import { connect } from 'react-redux';
import Viewport from './Viewport';

const withImages = (gameState, images, collection, keys = ['img']) => id => {
  console.log('gameState, images, collection', gameState, images, collection)
  const object = gameState[collection][id];
  return keys.reduce((acc, key) => {
    const img = images[object[key]];
    return { 
      ...acc, 
      [key]: img, 
      id
    };
  }, object);
};

const mapStateToProps = ({ images, gameState, playerState }) => {
  const { rooms } = gameState;
  const { room } = playerState;
  const { img, doors, items, scenery, video } = rooms[room];
  const visibleDoors = doors.filter(id => {
    return !!(gameState.doors[id].openImg || gameState.doors[id].closedImg);
  });

  /**
   * TODO: come up with a better way to fill these in
   * TODO: use reselect here
   */
  const doorsWithImages = visibleDoors
    .map(withImages(gameState, images, 'doors', ['openImg', 'closedImg']));
  return {
    doors: doorsWithImages,
    items: items.map(withImages(gameState, images, 'items')),
    scenery: scenery.map(withImages(gameState, images, 'scenery')),
    borderImg: images.border,
    roomImg: images[img],
    video
  };
};

const mapDispatchToProps = {
  onClick: (id, type) => ({ 
    type: 'SELECT_OBJECT', 
    payload: { id, type }
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(Viewport);
