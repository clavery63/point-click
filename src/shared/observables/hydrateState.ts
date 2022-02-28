import {
  map, skipWhile, switchMap, take, tap,
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { GameStoreState } from 'game/store/types';
import loadImages$ from './loadImages';
import validateGameState from '../validation/validateGameState';

const assetsBase = process.env.REACT_APP_ASSETS_BASE;

type LoadState = (initialState: GameStoreState) => Observable<GameStoreState>;
const loadPlayerAndGameState$: LoadState = initialState => {
  const roomKeys = Object.keys(initialState.worldState?.rooms || {});
  if (roomKeys.length > 0) {
    return of(initialState);
  }

  const dataSource = `${assetsBase}/${initialState.gameName}/gamedata.json`;
  return fromFetch(dataSource).pipe(
    switchMap(resp => resp.json()),
    tap(validateGameState),
    map(({
      playerState, worldState, flags, verbNames,
    }) => ({
      ...initialState,
      playerState,
      worldState,
      flags,
      verbNames,
    })),
  );
};

const setAudioSrc = (state: GameStoreState) => {
  const audioRoot = `${assetsBase}/${state.gameName}/audio`;
  const initialRoom = state.worldState.rooms[state.playerState.room];

  // Crazy hack that causes <audio> el behavior to improve wrt loading and
  // replaying srcs. Without it, there are hiccups in sfx sounds
  // https://stackoverflow.com/questions/9811429/html5-audio-tag-on-safari-has-a-delay
  // const AudioContext = window.AudioContext || window.webkitAudioContext;
  // eslint-disable-next-line no-new
  new AudioContext();

  const musicPlayer = document.querySelector('.music-player') as HTMLAudioElement;
  if (musicPlayer) {
    musicPlayer.src = `${audioRoot}/${initialRoom.music ?? ''}`;
  }

  const sfxPlayer = document.querySelector('.sfx-player') as HTMLAudioElement;
  if (sfxPlayer) {
    sfxPlayer.src = `${audioRoot}/transition.mp3`;
  }
};

type HydrateState = {
  (
    $state: Observable<GameStoreState>,
    initialize: (state: GameStoreState) => GameStoreState
  ): Observable<GameStoreState>;
};

const hydrateState$: HydrateState = (state$, initialize) => {
  return state$.pipe(
    skipWhile(state => !state.gameName.length),
    take(1),
    map(initialize),
    switchMap(loadPlayerAndGameState$),
    tap(setAudioSrc),
    switchMap(state => loadImages$(state.gameName).pipe(
      map(images => ({
        ...state,
        images,
      })),
    )),
  );
};

export default hydrateState$;
