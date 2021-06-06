import { tap, map, switchMapTo, withLatestFrom } from 'rxjs/operators';
import { merge } from 'rxjs';
import { ofType } from 'redux-observable';

const KEY = 'doublehamburger-save-data';

const saveGame = ({ gameState, playerState }) => {
  localStorage.setItem(KEY, JSON.stringify({
    gameState,
    playerState
  }));
};

const loadGame = oldState => {
  const newState = localStorage.getItem(KEY);
  if (!newState) {
    return { type: null }
  }

  const { gameState, playerState } = JSON.parse(newState);

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

const load$ = (action$, state$, { runText$ }) => {
  const save$ = action$.pipe(
    ofType('SAVE_GAME'),
    withLatestFrom(state$),
    tap(([,state]) => saveGame(state)),
    switchMapTo(runText$('Game Saved Successfully!'))
  );

  const load$ = action$.pipe(
    ofType('LOAD_GAME'),
    withLatestFrom(state$),
    map(([,state]) => loadGame(state))
  );


  return merge(save$, load$);
};

export default load$;
