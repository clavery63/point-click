import { EntityType, GameStoreState, WorldState } from 'game/store/types';

type Populate = <
  T extends EntityType
>(w: WorldState, c: T) => (id: number) => WorldState[T][number];
const populate: Populate = (worldState, collection) => id => {
  return worldState[collection][id];
};

const viewportSelector = (state: GameStoreState) => {
  const {
    images, worldState, playerState, flags,
  } = state;
  const { rooms } = worldState;
  const { room } = playerState;
  const {
    img, doors, items, scenery, video,
  } = rooms[room];

  return {
    doors: doors.map(populate(worldState, 'doors'))
      .filter(door => !!(door.openImg || door.closedImg)),
    items: items.map(populate(worldState, 'items'))
      .filter(item => !item.visibleFlag || flags.includes(item.visibleFlag)),
    scenery: scenery.map(populate(worldState, 'scenery'))
      .filter(sceneryObject => {
        return !sceneryObject.visibleFlag || flags.includes(sceneryObject.visibleFlag);
      }),
    borderImg: images.get('border'),
    roomImg: images.get(img || ''),
    video,
  };
};

export default viewportSelector;
