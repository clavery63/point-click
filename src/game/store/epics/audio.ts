import { filter, mapTo, switchMap, tap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { concat, EMPTY, of, merge, Observable } from 'rxjs';
import { MyEpic } from './types';
import { ReducerActions } from '../reducers/rootReducer';
import { isOfType } from 'typesafe-actions';

// TODO: derive the gameName part from state$
const audioAssetsRoot = `${process.env.REACT_APP_ASSETS_BASE}/test-game/audio`;

const audio$: MyEpic = (action$, state$, { runText$ }) => {
  const music$: Observable<ReducerActions> = action$.pipe(
    filter(isOfType('PLAY_MUSIC')),
    switchMap(({ payload }) => concat(
      payload.text ? runText$(payload.text) : EMPTY,
      of<ReducerActions>({ type: 'NULL' }).pipe(
        tap(() => {
          const player = document.querySelector('.music-player') as HTMLAudioElement;
          player.src = `${audioAssetsRoot}/${payload.fileName}`;
          player.play();
        }),
      )
    )),
  );

  const sfx$: Observable<ReducerActions> = action$.pipe(
    ofType('PLAY_SFX'),
    tap(() => {
      const player = document.querySelector('.sfx-player') as HTMLAudioElement;
      player.currentTime = 0;
      player.play();
    }),
    mapTo({ type: 'NULL' })
  );

  return merge(music$, sfx$);
};

export default audio$;
