import { ParentReducer } from 'shared/util/types';
import { VerbIndex } from '../types';
import { setValue, keepState } from './utils';

const selectVerbReducer: ParentReducer<VerbIndex> = (verb, playerState) => {
  if (playerState.using) {
    return keepState();
  }
  return setValue('playerState.verb')(verb);
};

export default selectVerbReducer;
