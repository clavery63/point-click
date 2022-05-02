import { map } from 'rxjs/operators';
import hydrateState$ from 'shared/observables/hydrateState';
import { setGameState } from 'admin/store/sharedActions';
import { GameStoreState } from 'game/store/types';
import defaultState from 'game/store/defaultState';
import { Observable } from 'rxjs';
import { Action } from '@reduxjs/toolkit';

type InitializeState = (state: GameStoreState) => GameStoreState;

const initializeState: InitializeState = (bootInfo) => {
  return {
    ...defaultState,
    gameName: bootInfo.gameName,
  };
};

const load$ = (action$: Observable<Action>, state$: Observable<GameStoreState>) => {
  return hydrateState$(state$, initializeState, 'gamedata-draft.json').pipe(
    map(setGameState),
  );
};

export default load$;
