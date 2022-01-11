import { compose } from 'lodash/fp';
import { DoorReducer, EntityReducer } from 'shared/util/types';
import { withText, setValue, clearValue, filterValues, combineReducers } from '../utils';
import genericVerbReducer from './genericVerbReducer';

const _useDoorReducer: DoorReducer = (object, playerState) => {
  if (playerState.using === object.keyId) {
    return compose(
      setValue(`worldState.doors[${object.id}].state`)('CLOSED'),
      withText(object.unlockText)
    );
  }

  // TODO: say something else if they aren't using a key
  return withText('Damn. Wrong key. The damned door is still locked.');
};

const forfeitItemReducer: EntityReducer = (_o, playerState) =>
  filterValues(`playerState.items`)(playerState.using);


// TODO: revisit the curried version of this one day. Perhaps you can submit a PR
// to typescript to be a little smarter WRT contravariance (specifically, be
// smart enough to allow params of function arguments to break contravariance if it's
// clear that that cases in the function are exhaustive)
const _useReducer: EntityReducer = (object, ...args) => {
  if (object.type === 'doors') {
    return _useDoorReducer(object, ...args);
  }

  return genericVerbReducer('USE', () => 'That ain\'t workin!\'!', forfeitItemReducer)(object, ...args);
};

const useReducer: EntityReducer = combineReducers(
  _useReducer,
  () => clearValue('playerState.using')
);

export default useReducer;
