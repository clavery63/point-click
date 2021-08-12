import { compose } from 'lodash/fp';
import { withText, setValue, clearValue, filterValues, combineReducers, when } from '../utils';
import genericVerbReducer from './genericVerbReducer';

const useDoorReducer = (object, playerState) => {
  if (playerState.using === object.keyId) {
    return compose(
      setValue(`gameState.doors.${object.id}.state`)('CLOSED'),
      withText(object.unlockText)
    );
  } else if (playerState.using === 'BAG' && object.name === 'pumpkin') {
    return compose(
      withText('Seeing that this pumpkin has already been "marked" as a safe vessel for storage, you hurriedly collapse the liquid contents from your bag into the gourd\'s saturated depths.  You breathe an exasperated sigh of relief.  Your bag is once again empty.'),
      setValue('playerState.bagLevel')(0)
    );
  }

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
