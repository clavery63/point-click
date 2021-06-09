import { setValue, keepState } from './utils';

const selectVerbReducer = (verb, playerState) => {
  if (playerState.using) {
    return keepState();
  }
  return setValue('playerState.verb')(verb);
};

export default selectVerbReducer;
