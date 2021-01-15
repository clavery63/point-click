import { compose } from 'lodash/fp';
import { withText, setValue, clearValue, updateValue } from '../utils';

const useReducer = object => state => {
  console.log(object)
  if (state.playerState.using === object.need) {
    return compose(
      setValue(`gameState.doors.${object.id}.state`)('CLOSED'),
      clearValue('playerState.using')(),
      withText(object.unlockText)
    )(state);
  } else if (object.useTexts) {
    return compose(
      withText(object.useTexts[object.useIndex]),
      updateValue(`gameState.scenery.${object.id}.useIndex`)(index => (index + 1) % object.useTexts.length)
    )(state);
  } else {
    return compose(
      clearValue('playerState.using')(),
      withText('That ain\'t workin\'.')
    )(state);
  }
};

export default useReducer;
