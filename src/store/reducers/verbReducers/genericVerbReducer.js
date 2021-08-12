import { compose } from 'lodash/fp';
import { get } from 'lodash';
import { withText, addFlags, removeFlags, setValue, when } from '../utils';

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

const genericVerbReducer = (verb, getDefaultText) => (object, playerState, flags) => {
  const logic = getVerbLogic(object, verb, flags);

  if (!logic) {
    return withText(getDefaultText(object));
  }

  if (logic.moveTo) {
    return setValue('transition')({ 
      dest: logic.moveTo, 
      dir: logic.moveDir
    });
  }

  return compose(
    when(logic.addFlags)(addFlags(logic.addFlags)),
    when(logic.removeFlags)(removeFlags(logic.removeFlags)),
    withText(logic.text),
  );
};

export default genericVerbReducer;
