import { map, switchMapTo, switchMap } from 'rxjs/operators';
import { of, merge, from } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { ofType } from 'redux-observable';
import loadImages$ from './loadImages';

const assetsBase = process.env.REACT_APP_ASSETS_BASE;
const testGameName = 'test-game';

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

const initializeUiState = () => ({
  transition: {
    dest: null
  },
  text: null,
  nextText: null,
  loading: false,
  menu: 'MAIN'
});

const loadPlayerAndGameState$ = uiState => {
  return fromFetch(`${assetsBase}/${testGameName}/gamedata.json`).pipe(
    switchMap(resp => resp.json()),
    map(({ playerState, gameState, flags }) => ({
      ...uiState,
      playerState,
      gameState,
      flags
    }))
  );
}

const load$ = action$ => {
  const initialUiState = initializeUiState();
  return loadPlayerAndGameState$(initialUiState).pipe(
    // TODO: the game name will come from react router
    switchMap(state => loadImages$(testGameName).pipe(
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
