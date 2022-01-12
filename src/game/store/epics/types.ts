import { Epic } from 'redux-observable';
import { ActionsType, ReducerActions } from '../reducers/rootReducer';
import { DoorDir, GameStoreState } from '../types';
import { Observable } from 'rxjs';

type EpicActionTypes = {
  RUN_TEXT: string,
  SAVE_GAME: null,
  LOAD_GAME: null,
  PLAY_SFX: null,
  PLAY_MUSIC: {
    text?: string,
    fileName: string
  },
  RUN_TRANSITION: {
    dest: number,
    dir: DoorDir,
    frame: number
  },
  PAGE_CLICK: null
};

type EpicActionsType = {
  [Key in keyof EpicActionTypes]: {
    type: Key,
    payload: EpicActionTypes[Key]
  }
}

type EpicActions = EpicActionsType[keyof EpicActionTypes];

export type AllActions = ReducerActions | EpicActions;

type Dependencies = {
  runText$: (t: string) => Observable<ActionsType['SET_TEXT']>
}

export type MyEpic = Epic<AllActions, AllActions, GameStoreState, Dependencies>;
