import { combineEpics, ofType } from 'redux-observable';
import animation$ from './animation';
import audio$ from './audio';
import cursor$ from './cursor';
import load$ from './load';
import save$ from './save';
import text$ from './text';
import transition$ from './transition';
import runText$ from './observables/runText';

const combined$ = combineEpics(audio$, animation$, cursor$, load$, save$, text$, transition$);

const withExtras$ = (action$, state$, extras) => {
  const pageClick$ = action$.pipe(ofType('PAGE_CLICK'))
  return combined$(action$, state$, {
    ...extras,
    runText$: runText$(pageClick$)
  })
};

export default withExtras$;
