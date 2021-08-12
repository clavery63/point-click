import { compose } from 'lodash/fp';
import { get } from 'lodash';
import { withText, addFlags, removeFlags, setValue, when, keepState } from '../utils';

const isValid = (option, using, flags) => {
  const { prereqUsing, prereqFlags } = option;
  if (prereqUsing && prereqUsing !== using) {
    return false;
  }

  return !prereqFlags || prereqFlags.every(flag => flags.has(flag));
};

const getVerbLogic = (object, verb, using, flags) => {
  const options = get(object, `verbs.${verb}`);

  for (let option of (options || [])) {
    if (isValid(option, using, flags)) {
      return option;
    }
  }

  return null;
}

const genericVerbReducer = (verb, getDefaultText, extraReducer = keepState) => {
  return (object, playerState, flags) => {
    const logic = getVerbLogic(object, verb, playerState.using, flags);

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
      extraReducer(object, playerState, flags)
    );
  };
};

export default genericVerbReducer;
