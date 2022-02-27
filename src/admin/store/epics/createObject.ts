import { from, merge, Observable } from 'rxjs';
import { filter, switchMap, withLatestFrom } from 'rxjs/operators';
import { Action, createAction } from '@reduxjs/toolkit';
import { RootState } from 'admin/ui/hooks/redux';
import { GameState } from 'game/store/types';
import { createEntity } from '../reducers/gameStateReducer/worldStateReducer/entitiesReducer';
import { addDoorToRoom, addEntityToRoom } from '../reducers/gameStateReducer/worldStateReducer/roomsReducer';
import { setSelected } from '../reducers/editorStateReducer/selectedEntityReducer';
import { createDoorWithId } from '../reducers/gameStateReducer/worldStateReducer/doorsReducer';
import { addItemToPlayer } from '../reducers/gameStateReducer/playerStateReducer';

export const createItem = createAction<number>('createItem');
export const createScenery = createAction<number>('createScenery');
export const createDoor = createAction<number>('createDoor');
export const createPlayerItem = createAction('createPlayerItem');

const generateKey = (gameState: GameState) => {
  const entityKeys = Object.keys(gameState.worldState.entities);
  const doorKeys = Object.keys(gameState.worldState.doors);
  const keys = [...entityKeys, ...doorKeys].map((key: string) => parseInt(key, 10));
  keys.sort((a, b) => a - b);

  // -2 becuase we have the bag with id 9999. That will eventually cause a bug...
  return keys[keys.length - 2] + 1;
};

const match = {
  items: createItem.match,
  scenery: createScenery.match,
};

const createObject$ = (action$: Observable<Action>, state$: Observable<RootState>) => {
  const entity$ = (type: 'items' | 'scenery') => action$.pipe(
    filter(match[type]),
    withLatestFrom(state$),
    switchMap(([{ payload: roomId }, { gameState }]) => {
      const id = generateKey(gameState);
      return from([
        addEntityToRoom({ entityId: id, roomId }),
        createEntity({ id, type }),
        setSelected({
          id,
          type: 'entity',
        }),
      ]);
    }),
  );

  const door$ = action$.pipe(
    filter(createDoor.match),
    withLatestFrom(state$),
    switchMap(([{ payload: roomId }, { gameState }]) => {
      const id = generateKey(gameState);
      return from([
        addDoorToRoom({ doorId: id, roomId }),
        createDoorWithId({ id }),
        setSelected({
          id,
          type: 'doors',
        }),
      ]);
    }),
  );

  const playerItem$ = action$.pipe(
    filter(createPlayerItem.match),
    withLatestFrom(state$),
    switchMap(([, { gameState }]) => {
      const id = generateKey(gameState);
      return from([
        addItemToPlayer({ id }),
        createEntity({ id, type: 'items' }),
      ]);
    }),
  );

  return merge(entity$('items'), entity$('scenery'), door$, playerItem$);
};

export default createObject$;
