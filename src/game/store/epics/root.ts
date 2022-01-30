import { combineEpics, ofType } from 'redux-observable';
import animation$ from './animation';
import audio$ from './audio';
import boot$ from './boot';
import save$ from './save';
import text$ from './text';
import transition$ from './transition';
import runText$ from './observables/runText';
import { MyEpic } from './types';

const combined$ = combineEpics(audio$, animation$, boot$, save$, text$, transition$);

const withExtras$: MyEpic = (action$, state$, extras) => {
  const pageClick$ = action$.pipe(ofType('PAGE_CLICK'));
  return combined$(action$, state$, {
    ...extras,
    runText$: runText$(pageClick$),
  });
};

export default withExtras$;
