import { EntityReducer } from 'shared/util/types';
import { setValue, withText } from '../utils';

const speakReducer: EntityReducer = (object) => {
  if (object.type === 'doors') {
    return withText('You cannot talk to this door. Actually. You can\'t talk to any doors in this game.');
  }

  const dialogId = object.dialog;

  if (dialogId != null) {
    return setValue('playerState.dialog')(dialogId);
  }

  return withText('TODO: Fall back to generic logic here');
};

export default speakReducer;
