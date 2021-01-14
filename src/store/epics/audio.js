import { mapTo, switchMap, tap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import runText$ from './observables/runText';
import { concat, of } from 'rxjs';

const audio$ = action$ => {
  return action$.pipe(
    ofType('PLAY_AUDIO'),
    switchMap(({ payload }) => concat(
      runText$(action$)(payload.text),
      of({}).pipe(
        tap(() => {
          const player = document.querySelector('.audio-player');
          player.src = `https://doublehamburger.com/${payload.fileName}`;
          player.play();
        }),
        mapTo({ type: null })
      )
    ))
  )
};

export default audio$;
