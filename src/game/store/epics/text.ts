import { filter, switchMap } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { ActionsType, ReducerActions } from '../reducers/rootReducer';
import { GameStoreState } from '../types';
import { Observable } from 'rxjs';
// TODO: see how big this library is. Should we implement it ourselves?
import { isOfType } from 'typesafe-actions';


type EpicActionTypes = {
  RUN_TEXT: string,
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

type MyEpic = Epic<AllActions, ReducerActions, GameStoreState, Dependencies>;

const text$: MyEpic = (action$, state$, { runText$ })  => {
  return action$.pipe(
    filter(isOfType('RUN_TEXT')),
    switchMap(({ payload }) => runText$(payload))
  );
};

export default text$;
