import { Epic } from 'redux-observable';
import { ActionsType, ReducerActions } from '../reducers/rootReducer';
import { GameStoreState } from '../types';
import { Observable } from 'rxjs';

type EpicActionTypes = {
  RUN_TEXT: string,
  SAVE_GAME: null,
  LOAD_GAME: null,
  PLAY_SFX: null,
  PLAY_MUSIC: {
    text: string,
    fileName: string
  }
};

type EpicActionsType = {
  [Key in keyof EpicActionTypes]: {
    type: Key,
    payload: EpicActionTypes[Key]
  }
}

type EpicActions = EpicActionsType[keyof EpicActionTypes];

type AllActions = ReducerActions | EpicActions;

type Dependencies = {
  runText$: (t: string) => Observable<ActionsType['SET_TEXT']>
}

export type MyEpic = Epic<AllActions, ReducerActions, GameStoreState, Dependencies>;
