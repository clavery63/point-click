import { compose } from 'redux';
import {
  Entity, Flag, Nullable, VerbIndex, VerbLogic,
} from 'game/store/types';
import { EntityReducer } from 'shared/util/types';
import get from 'shared/util/get';
import conditionValid from 'shared/util/conditionValid';
import {
  withText, addFlags, removeFlags, setValue, when, keepState,
} from '../utils';
import effectsReducer from '../effectsReducer';

const isValid = (verbLogic: VerbLogic, object: Entity, using: Nullable<number>, flags: Flag[]) => {
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
  flags: Flag[]
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

type GenericVerbReducer = (
  verb: VerbIndex,
  failureReducer: EntityReducer,
  successReducer?: EntityReducer
) => EntityReducer;
// eslint-disable-next-line max-len
const genericVerbReducer: GenericVerbReducer = (verb, failureReducer, successReducer = keepState) => {
  return (object, playerState, flags) => {
    const logic = getVerbLogic(object, verb, playerState.using, flags);

    if (!logic) {
      if (object.type === 'scenery' && object.trigger === verb) {
        // For now, ignore side effects if this triggers an animation
        return keepState();
      }
      return failureReducer(object, playerState, flags);
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
      successReducer(object, playerState, flags),
    );
  };
};

export default genericVerbReducer;
