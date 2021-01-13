import { withText } from '../utils';

const speakReducer = object => {
  if (object.onSpeak) {
    return withText(object.onSpeak);
  }

  return withText('Nope. No can do.');
};


export default speakReducer;
