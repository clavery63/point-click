import { map, switchMapTo, switchMap } from 'rxjs/operators';
import { of, merge, from } from 'rxjs';
import { ofType } from 'redux-observable';
import hydrateState$ from '../../../shared/observables/hydrateState';

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

const initializeGame = bootInfo => ({
  transition: {
    dest: null
  },
  text: null,
  nextText: null,
  loading: false,
  menu: 'MAIN',
  cursorEnabled: true,
  gameName: bootInfo.gameName,
  playerState: bootInfo.playerState,
  gameState: bootInfo.gameState,
  flags: bootInfo.flags,
});

const boot$ = (action$, state$) => {
  return hydrateState$(state$, initializeGame).pipe(
    map(loadFlagsSet),
    switchMap(state => merge(
      of({ type: 'SET_STATE', payload: state }),
      restart$(action$, state)
    ))
  );
};

export default boot$;
