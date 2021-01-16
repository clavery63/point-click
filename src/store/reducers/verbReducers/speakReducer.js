import { compose } from 'redux';
import { withText, updateValue } from '../utils';

const speakReducer = object => state => {
  const { onSpeak, speakTexts, speakIndex, id } = object;

  if (state.gameState.flags.has('GOOD') && object.speakGood) {
    return withText(object.speakGood)(state);
  }

  if (state.gameState.flags.has('BAD') && object.speakBad) {
    return withText(object.speakBad)(state);
  }

  if (onSpeak) {
    return withText(onSpeak)(state);
  } else if (speakTexts) {
    return compose(
      withText(speakTexts[speakIndex]),
      updateValue(`gameState.scenery.${id}.speakIndex`)(index => (index + 1) % speakTexts.length)
    )(state);
  }

  return withText('Nope. No can do.')(state);
};


export default speakReducer;
