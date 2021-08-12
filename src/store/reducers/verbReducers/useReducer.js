import { compose } from 'lodash/fp';
import { withText, setValue, clearValue, updateValue, filterValues, combineReducers } from '../utils';
import genericVerbReducer from './genericVerbReducer';

const useDoorReducer = (object, playerState, flags) => {
  if (playerState.using === 16 && object.id === 21) {
    if (!flags.has('GOOD') && !flags.has('BAD')) {
      flags.add('GOOD');
  
      // Do this via a flag
      // state.gameState.rooms[6].scenery = [21, 23];
  
      return withText('You give Sam the ice cold gin.');
    }
  }

  if (playerState.using === 17 && object.id === 21) {
    if (!flags.has('GOOD') && !flags.has('BAD')) {
      flags.add('BAD');

      // do this via a flag
      // state.gameState.rooms[6].scenery = [21, 22];

      return withText('You give Sam the gin.');
    }
  }

  console.log('playerState.using, object.keyId', playerState.using, object.keyId)

  if (playerState.using === object.keyId) {
    return compose(
      setValue(`gameState.doors.${object.id}.state`)('CLOSED'),
      withText(object.unlockText)
    );
  } else if (playerState.using === object.vanishOn) {
    return compose(
      withText(object.vanishText),
      filterValues(`gameState.rooms.${playerState.room}.scenery`)(object.id),
      filterValues(`playerState.items`)(playerState.using),
    );
  } else if (playerState.using === object.activeOn) {
    return compose(
      withText(object.activeText),
      updateValue('flags')(flags => {
        flags.add(object.activeFlag);
        return flags;
      }),
    );
  } else if (playerState.using === 'BAG' && object.name === 'pumpkin') {
    return compose(
      withText('Seeing that this pumpkin has already been "marked" as a safe vessel for storage, you hurriedly collapse the liquid contents from your bag into the gourd\'s saturated depths.  You breathe an exasperated sigh of relief.  Your bag is once again empty.'),
      setValue('playerState.bagLevel')(0)
    );
  }

  return withText('That ain\'t workin\'?');
};

const useReducerForType = type => {
  if (type === 'doors') {
    return useDoorReducer;
  }

  return genericVerbReducer('use', () => 'That ain\'t workin!\'!');
};

const useReducer = type => combineReducers(
  useReducerForType(type),
  () => clearValue('playerState.using')
);

export default useReducer;
