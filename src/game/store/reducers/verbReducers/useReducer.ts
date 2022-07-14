import { DoorState } from 'game/store/types';
import { compose } from 'redux';
import { DoorReducer, EntityReducer } from 'shared/util/types';
import {
  withText, setValue, clearValue, filterValues, combineReducers,
} from '../utils';
import { useReducer as setUsingReducer } from '../selectItemReducer';

const useDoorReducer: DoorReducer = (object, playerState) => {
  if (playerState.using === object.keyId) {
    return compose(
      setValue(`worldState.doors[${object.id}].state`)(DoorState.CLOSED),
      withText(object.unlockText),
    );
  }

  if (playerState.using) {
    return withText('Damn. Didn\'t work. The damn door is still locked.');
  }

  return withText('What you expected hasn\'t happened, and that really sucks.');
};

export const forfeitItemReducer: EntityReducer = combineReducers(
  (_o, playerState) => filterValues('playerState.items')(playerState.using),
  () => clearValue('playerState.using'),
);

const useReducerForType: EntityReducer = (object, playerState, flags) => {
  if (!playerState.using && object.type === 'items') {
    return setUsingReducer(object, playerState, flags);
  }

  if (object.type === 'doors') {
    return useDoorReducer(object, playerState, flags);
  }

  return withText('That ain\'t workin!\'!');
};

const useReducer: EntityReducer = combineReducers(
  useReducerForType,
  () => clearValue('playerState.using'),
);

export default useReducer;
