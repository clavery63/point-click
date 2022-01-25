import { map, switchMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import loadImages$ from './loadImages';

const assetsBase = process.env.REACT_APP_ASSETS_BASE;

const loadPlayerAndGameState$ = initialState => {
  if (initialState?.worldState?.rooms?.length > 0) {
    // If there are rooms, we've already fetched the data
    return of(initialState);
  }

  const dataSource = `${assetsBase}/${initialState.gameName}/gamedata.json`;
  return fromFetch(dataSource).pipe(
    switchMap(resp => resp.json()),
    tap(validateGameState),
    map(({ playerState, worldState, flags }) => ({
      ...initialState,
      playerState,
      worldState,
      flags,
    }))
  );
};

const setAudioSrc = state => {
  const audioRoot = `${assetsBase}/${state.gameName}/audio`;
  const initialRoom = state.worldState.rooms[state.playerState.room];
  
  // Crazy hack that causes <audio> el behavior to improve wrt loading and
  // replaying srcs. Without it, there are hiccups in sfx sounds
  // https://stackoverflow.com/questions/9811429/html5-audio-tag-on-safari-has-a-delay
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  new AudioContext();

  const musicPlayer = document.querySelector('.music-player');
  if (musicPlayer) {
    musicPlayer.src = `${audioRoot}/${initialRoom.music ?? ''}`;
  }

  const sfxPlayer = document.querySelector('.sfx-player');
  if (sfxPlayer) {
    sfxPlayer.src = `${audioRoot}/transition.mp3`;
  }
};

const hydrateState$ = (state$, initialize) => {
  return state$.pipe(
    take(1),
    map(initialize),
    switchMap(loadPlayerAndGameState$),
    tap(setAudioSrc),
    switchMap(state => loadImages$(state.gameName).pipe(
      map(images => ({
        ...state,
        images
      }))
    ))
  );
};

export default hydrateState$;
