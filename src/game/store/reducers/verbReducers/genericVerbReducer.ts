import { compose } from 'lodash/fp';
import effectsReducer from '../effectsReducer';
import { withText, addFlags, removeFlags, setValue, when, keepState } from '../utils';
import { Flags, Item, Nullable, Scenery, VerbIndex, VerbLogic } from 'game/store/types';
import { ItemOrSceneryReducer } from 'shared/util/types';
import get from 'shared/util/get';

const isValid = (verbLogic: VerbLogic, using: number | undefined, flags: Flags) => {
  const { prereqUsing, prereqFlags } = verbLogic;
  if (prereqUsing && prereqUsing !== using) {
    return false;
  }

  return !prereqFlags || prereqFlags.every(flag => flags.has(flag));
};

type GetVerbLogic = (
  object: Item | Scenery,
  verb: VerbIndex,
  using: number | undefined,
  flags: Flags
) => Nullable<VerbLogic>;
const getVerbLogic: GetVerbLogic = (object, verb, using, flags) => {
  const options = get(object, `verbs.${verb}`);

  for (let option of (options || [])) {
    if (isValid(option, using, flags)) {
      return option;
    }
  }

  return null;
};

type GetDefaultText = (object: Item | Scenery) => string;
type GenericVerbReducer = (verb: VerbIndex, getDefaultText: GetDefaultText, extraReducer: ItemOrSceneryReducer) => ItemOrSceneryReducer;
const genericVerbReducer: GenericVerbReducer = (verb, getDefaultText, extraReducer = keepState) => {
  return (object, playerState, flags) => {
    const logic = getVerbLogic(object, verb, playerState.using, flags);

    if (!logic) {
      return withText(getDefaultText(object));
    }

    if (logic.moveTo && logic.moveDir) {
      return setValue('transition')({ 
        dest: logic.moveTo, 
        dir: logic.moveDir
      });
    }

    return compose(
      when(!!logic.addFlags)(addFlags(logic.addFlags)),
      when(!!logic.removeFlags)(removeFlags(logic.removeFlags)),
      withText(logic.text),
      effectsReducer(logic),
      extraReducer(object, playerState, flags)
    );
  };
};

export default genericVerbReducer;
