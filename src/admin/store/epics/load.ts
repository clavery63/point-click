import { map, switchMap } from 'rxjs/operators';
import hydrateState$ from 'shared/observables/hydrateState';
import { setGameState } from 'admin/store/sharedActions';
import { GameStoreState } from 'game/store/types';
import defaultState from 'game/store/defaults/defaultGameStoreState';
import { Observable } from 'rxjs';
import { Action } from '@reduxjs/toolkit';
import loadImages$ from 'shared/observables/loadImages';

type InitializeState = (state: GameStoreState) => GameStoreState;

const initializeState: InitializeState = (bootInfo) => {
  return {
    ...defaultState,
    gameName: bootInfo.gameName,
  };
};

const load$ = (action$: Observable<Action>, state$: Observable<GameStoreState>) => {
  return hydrateState$(state$, initializeState, 'gamedata-draft.json').pipe(
    switchMap(state => loadImages$(state.gameName).pipe(
      map(images => ({
        ...state,
        images,
      })),
    )),
    map(setGameState),
  );
};

export default load$;
