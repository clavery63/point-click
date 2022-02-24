import { from, merge, Observable } from 'rxjs';
import { filter, switchMap, withLatestFrom } from 'rxjs/operators';
import { Action, createAction } from '@reduxjs/toolkit';
import { RootState } from 'admin/ui/hooks/redux';
import { GameState } from 'game/store/types';
import { createItemWithId } from '../reducers/gameStateReducer/worldStateReducer/entitiesReducer';
import { addDoorToRoom, addItemToRoom } from '../reducers/gameStateReducer/worldStateReducer/roomsReducer';
import { setSelected } from '../reducers/editorStateReducer/selectedEntityReducer';
import { createDoorWithId } from '../reducers/gameStateReducer/worldStateReducer/doorsReducer';

export const createItem = createAction<number>('createItem');
export const createDoor = createAction<number>('createDoor');

const generateKey = (gameState: GameState) => {
  const entityKeys = Object.keys(gameState.worldState.entities);
  const doorKeys = Object.keys(gameState.worldState.doors);
  const keys = [...entityKeys, ...doorKeys].map((key: string) => parseInt(key, 10));
  keys.sort((a, b) => a - b);

  // -2 becuase we have the bag with id 9999. That will eventually cause a bug...
  return keys[keys.length - 2] + 1;
};

const createItem$ = (action$: Observable<Action>, state$: Observable<RootState>) => {
  const entity$ = action$.pipe(
    filter(createItem.match),
    withLatestFrom(state$),
    switchMap(([{ payload: roomId }, { gameState }]) => {
      const id = generateKey(gameState);
      return from([
        addItemToRoom({ itemId: id, roomId }),
        createItemWithId({ id }),
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

  return merge(entity$, door$);
};

export default createItem$;
