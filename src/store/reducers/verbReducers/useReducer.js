import { compose } from 'lodash/fp';
import { withText, setValue, clearValue, updateValue, filterValues } from '../utils';

const useReducer = (object, playerState, flags) => {
  if (playerState.using === 16 && object.id === 21) {
    if (!flags.has('GOOD') && !flags.has('BAD')) {
      flags.add('GOOD');
  
      // Do this via a flag
      // state.gameState.rooms[6].scenery = [21, 23];
  
      return compose(
        withText('You give Sam the ice cold gin.'),
        clearValue('playerState.using')
      );
    }
  }

  if (playerState.using === 17 && object.id === 21) {
    if (!flags.has('GOOD') && !flags.has('BAD')) {
      flags.add('BAD');

      // do this via a flag
      // state.gameState.rooms[6].scenery = [21, 22];

      return compose(
        withText('You give Sam the gin.'),
        clearValue('playerState.using')
      );
    }
  }

  if (playerState.using === object.keyId) {
    return compose(
      setValue(`gameState.doors.${object.id}.state`)('CLOSED'),
      clearValue('playerState.using'),
      withText(object.unlockText)
    );
  } else if (object.useTexts) {
    return compose(
      withText(object.useTexts[object.useIndex]),
      updateValue(`gameState.scenery.${object.id}.useIndex`)(index => (index + 1) % object.useTexts.length),
      updateValue('gameState.flags')(flags => {
        if (object.useIndex === object.useTexts.length - 1) {
          // do this via a flag
          // state.gameState.rooms[6].scenery = [21];
        }
        return flags;
      }),
    );
  } else if (playerState.using === object.vanishOn) {
    return compose(
      withText(object.vanishText),
      filterValues(`gameState.rooms.${playerState.room}.scenery`)(object.id),
      filterValues(`playerState.items`)(playerState.using),
      clearValue('playerState.using'),
    );
  } else if (playerState.using === object.activeOn) {
    return compose(
      withText(object.activeText),
      updateValue('gameState.flags')(flags => {
        flags.add(object.activeFlag);
        return flags;
      }),
      clearValue('playerState.using'),
    );
  } else if (playerState.using === 'BAG' && object.name === 'pumpkin') {
    return compose(
      clearValue('playerState.using'),
      withText('Seeing that this pumpkin has already been "marked" as a safe vessel for storage, you hurriedly collapse the liquid contents from your bag into the gourd\'s saturated depths.  You breathe an exasperated sigh of relief.  Your bag is once again empty.'),
      setValue('playerState.bagLevel')(0)
      );
  }

  return compose(
    clearValue('playerState.using'),
    withText('That ain\'t workin\'.')
  );
};

export default useReducer;
