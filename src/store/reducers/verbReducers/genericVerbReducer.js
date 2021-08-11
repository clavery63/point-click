import { compose } from 'lodash/fp';
import { get } from 'lodash';
import { withText, addFlag, removeFlag, setValue } from '../utils';

const getVerbLogic = (object, verb, flags) => {
  const options = get(object, `verbs.${verb}`);
  if (!options) {
    return null;
  }

  for (let option of options) {
    if ((option.prereqFlags || []).every(flag => flags.has(flag))) {
      return option;
    }
  }

  return null;
}

const genericVerbReducer = (verb, defaultText) => (object, playerState, flags) => {
  const logic = getVerbLogic(object, verb, flags);
  if (!logic) {
    return withText(defaultText);
  }

  if (logic.moveTo) {
    return setValue('transition')({ 
      dest: logic.moveTo, 
      dir: logic.moveDir
    });
  }

  return compose(
    addFlag(logic.addFlag),
    removeFlag(logic.removeFlag),
    withText(logic.text),
  );
};

export default genericVerbReducer;
