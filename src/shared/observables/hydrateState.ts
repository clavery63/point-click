import {
  map, skipWhile, switchMap, take, tap,
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { GameStoreState } from 'game/store/types';
import loadImages$ from './loadImages';
import validateGameState from '../validation/validateGameState';

const assetsBase = process.env.REACT_APP_ASSETS_BASE;
const sharedAssetsBase = process.env.REACT_APP_SHARED_ASSETS_BASE;
const defaultFileName = 'gamedata.json';

type LoadState = (fileName: string) =>
  (initialState: GameStoreState) => Observable<GameStoreState>;
const loadPlayerAndGameState$: LoadState = fileName => initialState => {
  const roomKeys = Object.keys(initialState.worldState?.rooms || {});
  if (roomKeys.length > 0) {
    return of(initialState);
  }

  const dataSource = `${assetsBase}/${initialState.gameName}/${fileName}`;
  return fromFetch(dataSource).pipe(
    switchMap(resp => resp.json()),
    tap(validateGameState),
    map(({
      playerState, worldState, flags, config,
    }) => ({
      ...initialState,
      playerState,
      worldState,
      flags,
      config,
    })),
  );
};

const setPageTitle = ({ config }: GameStoreState) => {
  document.title = config.friendlyName;
};

const setAudioSrc = () => {
  const sharedAudioRoot = `${sharedAssetsBase}/audio`;

  // Crazy hack that causes <audio> el behavior to improve wrt loading and
  // replaying srcs. Without it, there are hiccups in sfx sounds
  // https://stackoverflow.com/questions/9811429/html5-audio-tag-on-safari-has-a-delay
  // const AudioContext = window.AudioContext || window.webkitAudioContext;
  // eslint-disable-next-line no-new
  new AudioContext();

  const sfxPlayer = document.querySelector('.sfx-player') as HTMLAudioElement;
  if (sfxPlayer) {
    sfxPlayer.src = `${sharedAudioRoot}/transition.mp3`;
  }
};

type HydrateState = {
  (
    $state: Observable<GameStoreState>,
    initialize: (state: GameStoreState) => GameStoreState,
    fileName?: string
  ): Observable<GameStoreState>;
};

const hydrateState$: HydrateState = (state$, initialize, fileName = defaultFileName) => {
  return state$.pipe(
    skipWhile(state => !state.gameName.length),
    take(1),
    map(initialize),
    switchMap(loadPlayerAndGameState$(fileName)),
    tap(setPageTitle),
    tap(setAudioSrc),
  );
};

export default hydrateState$;
