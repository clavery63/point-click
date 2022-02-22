import { from, Observable } from 'rxjs';
import { filter, switchMap, withLatestFrom } from 'rxjs/operators';
import { Action, createAction } from '@reduxjs/toolkit';
import { RootState } from 'admin/ui/hooks/redux';
import { createItemWithId } from '../reducers/gameStateReducer/worldStateReducer/entitiesReducer';
import { addItemToRoom } from '../reducers/gameStateReducer/worldStateReducer/roomsReducer';
import { setSelected } from '../reducers/editorStateReducer/selectedEntityReducer';

export const createItem = createAction<number>('createItem');

const createItem$ = (action$: Observable<Action>, state$: Observable<RootState>) => {
  return action$.pipe(
    filter(createItem.match),
    withLatestFrom(state$),
    switchMap(([{ payload: roomId }, { gameState }]) => {
      // TODO: tighten this up. Right now this is aware of bag with an id of 9999
      // And also not sure the ordering of these keys is guaranteed, etc.
      const keys = Object.keys(gameState.worldState.entities);
      const lastKey = keys[keys.length - 2];
      const nextKey = parseInt(lastKey, 10) + 1;

      return from([
        createItemWithId({ id: nextKey }),
        addItemToRoom({ itemId: nextKey, roomId }),
        setSelected({
          type: 'items',
          id: nextKey,
        }),
      ]);
    }),
  );
};

export default createItem$;
