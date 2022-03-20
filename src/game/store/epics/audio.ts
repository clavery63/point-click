import {
  filter, mapTo, switchMap, tap, withLatestFrom,
} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import {
  concat, EMPTY, of, merge, Observable,
} from 'rxjs';
import { isOfType } from 'typesafe-actions';
import { getAudioPath } from 'shared/util/getAssetsPath';
import { MyEpic } from './types';
import { ReducerActions } from '../reducers/rootReducer';

const updateMusic = (gameName: string, fileName?: string) => {
  const audioPath = getAudioPath(gameName);
  const player = document.querySelector('.music-player') as HTMLAudioElement;

  if (`${audioPath}/${fileName}` === player.src) {
    // src is unchanged, so continue playing this song
    return;
  }

  if (fileName) {
    player.src = `${audioPath}/${fileName}`;
    player.play();
  } else {
    player.src = '';
    player.pause();
  }
};

const audio$: MyEpic = (action$, state$, { runText$ }) => {
  const music$: Observable<ReducerActions> = action$.pipe(
    filter(isOfType('PLAY_MUSIC')),
    withLatestFrom(state$),
    switchMap(([{ payload }, { gameName }]) => concat(
      payload.text ? runText$(payload.text) : EMPTY,
      of<ReducerActions>({ type: 'NULL' }).pipe(
        tap(() => updateMusic(gameName, payload.fileName)),
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
