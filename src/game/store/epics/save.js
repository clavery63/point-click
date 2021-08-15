import { tap, switchMap, switchMapTo, withLatestFrom } from 'rxjs/operators';
import { from, merge } from 'rxjs';
import { ofType } from 'redux-observable';

const KEY = 'doublehamburger-save-data';

const saveGame = ({ gameState, playerState, flags }) => {
  localStorage.setItem(KEY, JSON.stringify({
    gameState,
    playerState,
    flags: [...flags]
  }));
};

const loadGame$ = () => {
  const newState = localStorage.getItem(KEY);
  if (!newState) {
    return { type: null }
  }

  const { gameState, playerState, flags } = JSON.parse(newState);

  return from([
    { type: 'SET_GAME_STATE', payload: gameState },
    { type: 'SET_PLAYER_STATE', payload: playerState },
    { type: 'SET_FLAGS', payload: new Set(flags) },
    { type: 'SET_MENU', payload: 'NONE' },
  ]);
};

const save$ = (action$, state$, { runText$ }) => {
  const saveGame$ = action$.pipe(
    ofType('SAVE_GAME'),
    withLatestFrom(state$),
    tap(([,state]) => saveGame(state)),
    switchMapTo(runText$('Game Saved Successfully!'))
  );

  const load$ = action$.pipe(
    ofType('LOAD_GAME'),
    withLatestFrom(state$),
    switchMap(([,state]) => loadGame$(state))
  );


  return merge(saveGame$, load$);
};

export default save$;
