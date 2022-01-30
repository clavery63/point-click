import { ofType } from 'redux-observable';
import { map, withLatestFrom } from 'rxjs/operators';
import { setPreview } from '../reducers/previewReducer';

const preview$ = (action$, state$) => {
  return action$.pipe(
    ofType('START_PREVIEW'),
    withLatestFrom(state$),
    map(([{ payload }, { gameState }]) => setPreview({
      ...gameState,
      menu: 'NONE',
      playerState: {
        ...gameState.playerState,
        // TODO: make this way more easily configurable
        room: payload
      }
    }))
  );
};

export default preview$;
