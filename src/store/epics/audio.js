import { mapTo, switchMap, tap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { concat, EMPTY, of, merge } from 'rxjs';

// TODO: derive the gameName part from state$
const audioAssetsRoot = `${process.env.REACT_APP_ASSETS_BASE}/test-game/audio`;

const audio$ = (action$, state$, { runText$ }) => {
  const music$ = action$.pipe(
    ofType('PLAY_MUSIC'),
    switchMap(({ payload }) => concat(
      payload.text ? runText$(payload.text) : EMPTY,
      of({}).pipe(
        tap(() => {
          const player = document.querySelector('.music-player');
          player.src = `${audioAssetsRoot}/${payload.fileName}`;
          player.play();
        }),
        mapTo({ type: null })
      )
    ))
  );

  const sfx$ = action$.pipe(
    ofType('PLAY_SFX'),
    tap(() => {
      const player = document.querySelector('.sfx-player');
      player.currentTime = 0;
      player.play();
    }),
    mapTo({ type: null })
  );

  return merge(music$, sfx$);
};

export default audio$;
