import {
  GameStoreState, Item, Scenery, WorldState,
} from 'game/store/types';

type Populate = <
  T extends 'entities' | 'doors' // TODO: do a better job here
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
    img, doors, entities: entityIds, video,
  } = rooms[room];

  const entities = entityIds.map(populate(worldState, 'entities'));

  // TODO: move the selctors into the individual entity group components
  // to avoid the type casting below

  return {
    doors: doors.map(populate(worldState, 'doors'))
      .filter(door => !!(door.openImg || door.closedImg)),
    items: entities.filter(entity => entity.type === 'items')
      .filter(item => !item.visibleFlag || flags.includes(item.visibleFlag)) as Item[],
    scenery: entities.filter(entity => entity.type === 'scenery')
      .filter(sceneryObject => {
        return !sceneryObject.visibleFlag || flags.includes(sceneryObject.visibleFlag);
      }) as Scenery[],
    borderImg: images.get('border'),
    roomImg: images.get(img || ''),
    video,
  };
};

export default viewportSelector;
