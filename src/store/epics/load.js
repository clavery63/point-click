import { map, switchMap, mapTo } from 'rxjs/operators';
import { of, timer } from 'rxjs';
import initialState from '../initialState';

const load$ = () => {
  /**
   * Once this is customizable outside of the codebase, we will optionally
   * get this initial state from a network request.
   */
  const initialState$ = of(initialState);
  return initialState$.pipe(
    /**
     * Force it to be async so we don't shoot ourselves in the foot later
     */
    switchMap(state => timer(0).pipe(mapTo(state))),
    map(state => ({ type: 'SET_STATE', payload: state }))
  );
};

export default load$;
