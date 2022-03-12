import { DoorState } from 'game/store/types';
import { compose } from 'redux';
import { DoorReducer, EntityReducer } from 'shared/util/types';
import {
  withText, setValue, clearValue, filterValues, combineReducers,
} from '../utils';
import genericVerbReducer from './genericVerbReducer';
import { useReducer as setUsingReducer } from '../selectItemReducer';

const useDoorReducer: DoorReducer = (object, playerState) => {
  if (playerState.using === object.keyId) {
    return compose(
      setValue(`worldState.doors[${object.id}].state`)(DoorState.CLOSED),
      withText(object.unlockText),
    );
  }

  return withText('Damn. Didn\'t work. The damned door is still locked.');
};

const forfeitItemReducer: EntityReducer = (_o, playerState) => filterValues('playerState.items')(playerState.using);

const useReducerForType: EntityReducer = (object, playerState, flags) => {
  if (!playerState.using && object.type === 'items') {
    return setUsingReducer(object, playerState, flags);
  }

  if (object.type === 'doors') {
    return useDoorReducer(object, playerState, flags);
  }

  return genericVerbReducer(3, () => 'That ain\'t workin!\'!', forfeitItemReducer)(object, playerState, flags);
};

const useReducer: EntityReducer = combineReducers(
  useReducerForType,
  () => clearValue('playerState.using'),
);

export default useReducer;
