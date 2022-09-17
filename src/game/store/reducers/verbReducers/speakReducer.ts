import { EntityReducer } from 'shared/util/types';
import { withText } from '../utils';

const takeReducer: EntityReducer = (object, _playerState, flags) => {
  console.log('flags:', flags);
  if (object.type === 'doors') {
    return withText('You cannot talk to this door. Actually. You can\'t talk to any doors in this game.');
  }
  return withText('Can\'t take it!');
};

export default takeReducer;
