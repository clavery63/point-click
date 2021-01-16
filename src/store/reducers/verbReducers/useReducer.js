import { compose } from 'lodash/fp';
import { withText, setValue, clearValue, updateValue } from '../utils';

const useReducer = object => state => {
  if (state.playerState.using === object.keyId) {
    return compose(
      setValue(`gameState.doors.${object.id}.state`)('CLOSED'),
      clearValue('playerState.using')(),
      withText(object.unlockText)
    )(state);
  } else if (object.useTexts) {
    return compose(
      withText(object.useTexts[object.useIndex]),
      updateValue(`gameState.scenery.${object.id}.useIndex`)(index => (index + 1) % object.useTexts.length),
      updateValue('gameState.flags')(flags => {
        if (object.useIndex === object.useTexts.length - 1) {
          flags.add(object.onUseFlag);
        }
        console.log(flags);
        return flags;
      }),
    )(state);
  } else if (state.playerState.using === object.vanishOn) {
    return compose(
      withText(object.vanishText),
      updateValue(`gameState.rooms.${state.playerState.room}.scenery`)(scenery => scenery.filter(id => id !== object.id)),
      updateValue(`playerState.items`)(items => items.filter(id => id !== state.playerState.using)),
      clearValue('playerState.using')(),
    )(state);
  } else if (state.playerState.using === object.activeOn) {
    return compose(
      withText(object.activeText),
      updateValue('gameState.flags')(flags => {
        flags.add(object.activeFlag);
        return flags;
      }),
      clearValue('playerState.using')(),
    )(state);
  } else if (state.playerState.using === 'BAG' && object.name === 'pumpkin') {
    return compose(
      clearValue('playerState.using')(),
      withText('Seeing that this pumpkin has already been "marked" as a safe vessel for storage, you hurriedly collapse the liquid contents from your bag into the gourd\'s saturated depths.  You breathe an exasperated sigh of relief.  Your bag is once again empty.'),
      setValue('playerState.bagLevel')(0)
      )(state);
  }

  return compose(
    clearValue('playerState.using')(),
    withText('That ain\'t workin\'.')
  )(state);
};

export default useReducer;
