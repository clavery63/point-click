import {
  filter, mapTo, switchMap, tap,
} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import {
  concat, EMPTY, of, merge, Observable,
} from 'rxjs';
import { isOfType } from 'typesafe-actions';
import { MyEpic } from './types';
import { ReducerActions } from '../reducers/rootReducer';

// TODO: derive the gameName part from state$
const audioAssetsRoot = `${process.env.REACT_APP_ASSETS_BASE}/test-game/audio`;

const updateMusic = (fileName?: string) => {
  const player = document.querySelector('.music-player') as HTMLAudioElement;

  console.log('fileName:', fileName);
  console.log('player.src:', player.src);

  if (`${audioAssetsRoot}/${fileName}` === player.src) {
    // src is unchanged, so continue playing this song
    return;
  }

  if (fileName) {
    player.src = `${audioAssetsRoot}/${fileName}`;
    player.play();
  } else {
    player.src = '';
    player.pause();
  }
};

const audio$: MyEpic = (action$, state$, { runText$ }) => {
  const music$: Observable<ReducerActions> = action$.pipe(
    filter(isOfType('PLAY_MUSIC')),
    switchMap(({ payload }) => concat(
      payload.text ? runText$(payload.text) : EMPTY,
      of<ReducerActions>({ type: 'NULL' }).pipe(
        tap(() => updateMusic(payload.fileName)),
      ),
    )),
  );

  const sfx$: Observable<ReducerActions> = action$.pipe(
    ofType('PLAY_SFX'),
    tap(() => {
      const player = document.querySelector('.sfx-player') as HTMLAudioElement;
      player.currentTime = 0;
      player.play();
    }),
    mapTo({ type: 'NULL' }),
  );

  return merge(music$, sfx$);
};

export default audio$;
