import { compose } from 'redux';
import {
  Entity, Flags, Nullable, VerbIndex, VerbLogic,
} from 'game/store/types';
import { EntityReducer } from 'shared/util/types';
import get from 'shared/util/get';
import conditionValid from 'shared/util/conditionValid';
import {
  withText, addFlags, removeFlags, setValue, when, keepState,
} from '../utils';
import effectsReducer from '../effectsReducer';

const isValid = (verbLogic: VerbLogic, object: Entity, using: Nullable<number>, flags: Flags) => {
  const { prereqUsing, prereqFlags } = verbLogic;
  if (prereqUsing && prereqUsing !== using) {
    return false;
  }

  if (prereqFlags?.some(flag => !flags.includes(flag))) {
    return false;
  }

  if (verbLogic.condition) {
    return conditionValid(verbLogic.condition, object);
  }

  return true;
};

type GetVerbLogic = (
  object: Entity,
  verb: VerbIndex,
  using: Nullable<number>,
  flags: Flags
) => Nullable<VerbLogic>;
const getVerbLogic: GetVerbLogic = (object, verb, using, flags) => {
  const options = get(object, `verbs.${verb}`);

  // eslint-disable-next-line no-restricted-syntax
  for (const option of (options || [])) {
    if (isValid(option, object, using, flags)) {
      return option;
    }
  }

  return null;
};

type GetDefaultText = (object: Entity) => Nullable<string>;
type GenericVerbReducer = (
  verb: VerbIndex,
  getDefaultText: GetDefaultText,
  extraReducer?: EntityReducer
) => EntityReducer;
const genericVerbReducer: GenericVerbReducer = (verb, getDefaultText, extraReducer = keepState) => {
  return (object, playerState, flags) => {
    const logic = getVerbLogic(object, verb, playerState.using, flags);

    if (!logic) {
      if (object.type === 'scenery' && object.trigger === verb) {
        // Don't display default text if this triggers an animation
        return keepState();
      }
      return withText(getDefaultText(object));
    }

    if (logic.moveTo && logic.moveDir) {
      return setValue('transition')({
        dest: logic.moveTo,
        dir: logic.moveDir,
      });
    }

    return compose(
      when(!!logic.addFlags)(addFlags(logic.addFlags || [])),
      when(!!logic.removeFlags)(removeFlags(logic.removeFlags || [])),
      withText(logic.text),
      effectsReducer(logic),
      extraReducer(object, playerState, flags),
    );
  };
};

export default genericVerbReducer;
