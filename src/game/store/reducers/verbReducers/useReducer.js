import { compose } from 'lodash/fp';
import { withText, setValue, clearValue, filterValues, combineReducers, when } from '../utils';
import genericVerbReducer from './genericVerbReducer';

const useDoorReducer = (object, playerState) => {
  if (playerState.using === object.keyId) {
    return compose(
      setValue(`gameState.doors.${object.id}.state`)('CLOSED'),
      withText(object.unlockText)
    );
  }

  // TODO: say something else if they aren't using a key
  return withText('Damn. Wrong key. The damned door is still locked.');
};

const forfeitItemReducer = (object, playerState) =>
  when(!object.retainUsing)(filterValues(`playerState.items`)(playerState.using));

const useReducerForType = type => {
  if (type === 'doors') {
    return useDoorReducer;
  }

  return genericVerbReducer('use', () => 'That ain\'t workin!\'!', forfeitItemReducer)
};

const useReducer = type => combineReducers(
  useReducerForType(type),
  () => clearValue('playerState.using')
);

export default useReducer;
