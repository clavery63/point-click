import { Epic } from 'redux-observable';
import { Observable } from 'rxjs';
import { ActionsType, ReducerActions } from '../reducers/rootReducer';
import { DoorDir, GameStoreState } from '../types';

type EpicActions =
  { type: 'SAVE_GAME' } |
  { type: 'LOAD_GAME' } |
  { type: 'PLAY_SFX' } |
  { type: 'PAGE_CLICK' } |
  { type: 'START_GAME'; payload: boolean } |
  { type: 'RUN_TEXT'; payload: string } |
  {
    type: 'PLAY_MUSIC';
    payload: {
      text?: string;
      fileName?: string;
    };
  } |
  {
    type: 'RUN_TRANSITION';
    payload: {
      dest: number;
      dir: DoorDir;
      frame: number;
    };
  };

export type AllActions = ReducerActions | EpicActions;

type Dependencies = {
  runText$: (t: string) => Observable<ActionsType['SET_TEXT']>;
};

export type MyEpic = Epic<AllActions, AllActions, GameStoreState, Dependencies>;
