import { from, merge, Observable } from 'rxjs';
import { filter, switchMap, withLatestFrom } from 'rxjs/operators';
import { Action, createAction } from '@reduxjs/toolkit';
import { RootState } from 'admin/ui/hooks/redux';
import { GameState } from 'game/store/types';
import { addItemToContainer, createEntity } from '../reducers/gameStateReducer/worldStateReducer/entitiesReducer';
import { addDoorToRoom, addEntityToRoom } from '../reducers/gameStateReducer/worldStateReducer/roomsReducer';
import { setSelected } from '../reducers/editorStateReducer/selectedEntityReducer';
import { createDoorWithId } from '../reducers/gameStateReducer/worldStateReducer/doorsReducer';
import { addItemToPlayer } from '../reducers/gameStateReducer/playerStateReducer';

export const createItem = createAction<number | undefined>('createItem');
export const createScenery = createAction<number>('createScenery');
export const createDoor = createAction<number>('createDoor');
export const createPlayerItem = createAction('createPlayerItem');
export const createContainedItem = createAction<number>('createContainedItem');

const generateKey = (gameState: GameState) => {
  const entityKeys = Object.keys(gameState.worldState.entities);
  const doorKeys = Object.keys(gameState.worldState.doors);
  const keys = [...entityKeys, ...doorKeys].map((key: string) => parseInt(key, 10));
  keys.sort((a, b) => a - b);

  if (!keys.length) {
    return 0;
  }

  return keys[keys.length - 1] + 1;
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
      const id = generateKey(gameState.present);
      return from([
        createEntity({ id, type, isStatic: roomId === undefined }),
        addEntityToRoom({ entityId: id, roomId }),
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
      const id = generateKey(gameState.present);
      return from([
        createDoorWithId({ id }),
        addDoorToRoom({ doorId: id, roomId }),
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
      const id = generateKey(gameState.present);
      return from([
        createEntity({ id, type: 'items', isStatic: false }),
        addItemToPlayer({ id }),
        setSelected({
          id,
          type: 'entity',
        }),
      ]);
    }),
  );

  const containedItem$ = action$.pipe(
    filter(createContainedItem.match),
    withLatestFrom(state$),
    switchMap(([{ payload: containerId }, { gameState }]) => {
      const id = generateKey(gameState.present);
      return from([
        createEntity({ id, type: 'items', isStatic: false }),
        addItemToContainer({ id, containerId }),
        setSelected({
          id,
          type: 'entity',
        }),
      ]);
    }),
  );

  return merge(
    entity$('items'),
    entity$('scenery'),
    door$,
    playerItem$,
    containedItem$,
  );
};

export default createObject$;
