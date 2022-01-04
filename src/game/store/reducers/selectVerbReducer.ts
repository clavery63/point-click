import { Reducer } from './rootReducer';
import { setValue, keepState } from './utils';

const selectVerbReducer: Reducer<string> = (verb, playerState) => {
  if (playerState.using) {
    return keepState();
  }
  return setValue('playerState.verb')(verb);
};

export default selectVerbReducer;
