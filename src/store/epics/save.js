import { tap, map, switchMapTo, withLatestFrom } from 'rxjs/operators';
import { merge } from 'rxjs';
import { ofType } from 'redux-observable';
import runText$ from './observables/runText';

const KEY = 'doublehamburger-save-data';
const revertFlags = data => { data.flags = data.flags.length ? new Set(data.flags) : new Set() };

const saveGame = ({ gameState, playerState }) => {
  gameState.flags = Array.from(gameState.flags)
  localStorage.setItem(KEY, JSON.stringify({
    gameState,
    playerState
  }));
  revertFlags(gameState);
};

const loadGame = oldState => {
  const newState = localStorage.getItem(KEY);
  if (!newState) {
    return { type: null }
  }
  const { gameState, playerState } = JSON.parse(newState);
  revertFlags(gameState);

  const payload = {
    ...oldState,
    gameState: {
      ...gameState,
      images: oldState.gameState.images
    },
    playerState,
    menu: 'NONE'
  };

  return { 
    type: 'SET_STATE',
    payload
  };
};

const load$ = (action$, state$) => {
  const save$ = action$.pipe(
    ofType('SAVE_GAME'),
    withLatestFrom(state$),
    tap(([,state]) => saveGame(state)),
    switchMapTo(runText$(action$)('Game Saved Successfully!'))
  );

  const load$ = action$.pipe(
    ofType('LOAD_GAME'),
    withLatestFrom(state$),
    map(([,state]) => loadGame(state))
  );


  return merge(save$, load$);
};

export default load$;
