import { DoorState } from 'game/store/types';
import { compose } from 'redux';
import { DoorReducer, EntityReducer } from 'shared/util/types';
import {
  withText, setValue, clearValue, filterValues, combineReducers,
} from '../utils';
import genericVerbReducer from './genericVerbReducer';

const useDoorReducer: DoorReducer = (object, playerState) => {
  if (playerState.using === object.keyId) {
    return compose(
      setValue(`worldState.doors[${object.id}].state`)(DoorState.CLOSED),
      withText(object.unlockText),
    );
  }

  // TODO: say something else if they aren't using a key
  return withText('Damn. Wrong key. The damned door is still locked.');
};

const forfeitItemReducer: EntityReducer = (_o, playerState) => filterValues('playerState.items')(playerState.using);

// TODO: revisit the curried version of this one day. Perhaps you can submit a PR
// to typescript to be a little smarter WRT contravariance (specifically, be
// smart enough to allow params of function arguments to break contravariance if it's
// clear that that cases in the function are exhaustive)
const useReducerForType: EntityReducer = (object, ...args) => {
  if (object.type === 'doors') {
    return useDoorReducer(object, ...args);
  }

  return genericVerbReducer(3, () => 'That ain\'t workin!\'!', forfeitItemReducer)(object, ...args);
};

const useReducer: EntityReducer = combineReducers(
  useReducerForType,
  () => clearValue('playerState.using'),
);

export default useReducer;
