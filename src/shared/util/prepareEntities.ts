import { Entity, GameState } from "game/store/types";

const addFieldsFor = <T extends Entity>(
  type: string,
  collection: Record<number, T>
): Record<number, T> => {
  return Object.entries(collection).reduce((acc, [id, ent]) => {
    return {
      ...acc,
      [id]: {
        ...ent,
        id: parseInt(id, 10),
        type
      }
    }
  }, {});
};


/**
 * Adds some data to entities from hydrated state for convenience. In the,
 * future, we may make an effort to just store these ents with this data
 * already formatted this way (space-inefficient as it may be)
 */
const prepareEntities = (gameState: GameState): GameState => {
  const { doors, scenery, items, rooms } = gameState.worldState;
  return {
    ...gameState,
    worldState: {
      doors: addFieldsFor('doors', doors),
      items: addFieldsFor('items', items),
      scenery: addFieldsFor('scenery', scenery),
      rooms,
    }
  }
};

export default prepareEntities;
