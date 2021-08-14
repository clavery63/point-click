import { map, switchMapTo, switchMap, take } from 'rxjs/operators';
import { of, merge, from } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { ofType } from 'redux-observable';
import loadImages$ from './loadImages';

const assetsBase = process.env.REACT_APP_ASSETS_BASE;

const loadFlagsSet = state => {
  return {
    ...state,
    flags: new Set(state.flags)
  };
};

const restart$ = (action$, { playerState, gameState }) => {
  const initialRoom = gameState.rooms[playerState.room];
  const { description, initialDescription } = initialRoom;
  return action$.pipe(
    ofType('START_GAME'),
    switchMapTo(from([
      { type: 'RUN_TEXT', payload: initialDescription || description },
      { type: 'SET_MENU', payload: 'NONE' },
      { type: 'SET_GAME_STATE', payload: gameState },
      { type: 'SET_PLAYER_STATE', payload: playerState },
    ]))
  );
};

const initializeState = bootInfo => ({
  transition: {
    dest: null
  },
  text: null,
  nextText: null,
  loading: false,
  menu: 'MAIN',
  gameName: bootInfo.gameName,
  playerState: bootInfo.playerState,
  gameState: bootInfo.gameState,
  flags: bootInfo.flags,
});

const loadPlayerAndGameState$ = initialState => {
  if (initialState.playerState) {
    // If there is playerState it was passed into GameRoot
    return of(initialState);
  }

  const dataSource = `${assetsBase}/${initialState.gameName}/gamedata.json`;
  return fromFetch(dataSource).pipe(
    // TODO: render something useful if the response is no good
    switchMap(resp => resp.json()),
    map(({ playerState, gameState, flags }) => ({
      ...initialState,
      playerState,
      gameState,
      flags,
    }))
  );
}

const load$ = (action$, state$) => {
  return state$.pipe(
    take(1),
    map(initializeState),
    switchMap(loadPlayerAndGameState$),
    // TODO: we should support passing images along with the initial state
    // so we can skip downloading the images
    switchMap(state => loadImages$(state.gameName).pipe(
      map(images => ({
        ...state,
        images
      }))
    )),
    map(loadFlagsSet),
    switchMap(state => merge(
      of({ type: 'SET_STATE', payload: state }),
      restart$(action$, state)
    ))
  );
};

export default load$;
