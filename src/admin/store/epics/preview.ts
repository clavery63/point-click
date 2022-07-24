import { Observable } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { Action, createAction } from '@reduxjs/toolkit';
import { RootState } from 'admin/ui/hooks/redux';
import { setPreview } from '../reducers/previewReducer';

export const startPreview = createAction<number>('startPreview');

const preview$ = (action$: Observable<Action>, state$: Observable<RootState>) => {
  return action$.pipe(
    filter(startPreview.match),
    withLatestFrom(state$),
    map(([{ payload }, { gameState, images }]) => setPreview({
      ...gameState.present,
      images,
      playerState: {
        ...gameState.present.playerState,
        // TODO: make this way more easily configurable
        room: payload,
      },
    })),
  );
};

export default preview$;
