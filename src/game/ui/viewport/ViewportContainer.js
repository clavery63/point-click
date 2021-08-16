import { connect } from 'react-redux';
import Viewport from './Viewport';

const withImages = (worldState, images, collection, keys = ['img']) => id => {
  const object = worldState[collection][id];
  return keys.reduce((acc, key) => {
    const img = images[object[key]];
    return { 
      ...acc, 
      [key]: img, 
      id
    };
  }, object);
};

const mapStateToProps = ({ images, worldState, playerState, flags }) => {
  const { rooms } = worldState;
  const { room } = playerState;
  const { img, doors, items, scenery, video } = rooms[room];
  const visibleDoors = doors.filter(id => {
    return !!(worldState.doors[id].openImg || worldState.doors[id].closedImg);
  });

  /**
   * TODO: come up with a better way to fill these in
   * TODO: use reselect here
   */
  const doorsWithImages = visibleDoors
    .map(withImages(worldState, images, 'doors', ['openImg', 'closedImg']));
  return {
    doors: doorsWithImages,
    items: items.map(withImages(worldState, images, 'items'))
      .filter(item => !item.visibleFlag || flags.has(item.visibleFlag)),
    scenery: scenery.map(withImages(worldState, images, 'scenery'))
      .filter(scenery => !scenery.visibleFlag || flags.has(scenery.visibleFlag)),
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
