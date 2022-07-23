import {
  GameStoreState, WorldState,
} from 'game/store/types';
import includesAll from 'shared/util/includesAll';

type Populate = <
  T extends 'entities' | 'doors' // TODO: do a better job here
>(w: WorldState, c: T) => (id: number) => WorldState[T][number];
const populate: Populate = (worldState, collection) => id => {
  return worldState[collection][id];
};

const viewportSelector = (state: GameStoreState) => {
  const {
    images, worldState, playerState, flags, gameName,
  } = state;
  const { rooms } = worldState;
  const { room } = playerState;
  const {
    img, doors, entities: entityIds, video,
  } = rooms[room];

  const entities = entityIds.map(populate(worldState, 'entities'));

  return {
    doors: doors.map(populate(worldState, 'doors'))
      .filter(door => !!(door.openImg || door.closedImg)),
    entities: entities
      .filter(({ visibleFlags }) => includesAll(flags, visibleFlags)),
    roomImg: images.get(img || ''),
    video,
    gameName,
  };
};

export default viewportSelector;
