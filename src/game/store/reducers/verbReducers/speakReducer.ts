import { EntityReducer } from 'shared/util/types';
import { withText } from '../utils';

const speakReducer: EntityReducer = (object) => {
  if (object.type === 'doors') {
    return withText('You cannot talk to this door. Actually. You can\'t talk to any doors in this game.');
  }
  return withText('TODO: Fall back to generic logic here');
};

export default speakReducer;
