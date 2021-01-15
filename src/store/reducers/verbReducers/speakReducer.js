import { compose } from 'redux';
import { withText, updateValue } from '../utils';

const speakReducer = object => {
  const { onSpeak, speakTexts, speakIndex, id } = object;
  if (onSpeak) {
    return withText(onSpeak);
  } else if (speakTexts) {
    return compose(
      withText(speakTexts[speakIndex]),
      updateValue(`gameState.scenery.${id}.speakIndex`)(index => (index + 1) % speakTexts.length)
    );
  }

  return withText('Nope. No can do.');
};


export default speakReducer;
