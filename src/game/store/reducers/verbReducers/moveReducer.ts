import { compose } from 'redux';
import { DoorReducer, EntityReducer } from 'shared/util/types';
import { withText, setValue, clearValue } from '../utils';

const doorReducer: DoorReducer = ({ state, dest, dir }) => {
  switch (state) {
    case 'OPEN':
      return compose(
        clearValue('playerState.examining'),
        setValue('transition')({ dest, dir }),
      );
    default:
      return withText('You have to open the door before you go through it.');
  }
};

const moveReducer: EntityReducer = (object, _p, _f) => {
  if (object.type === 'doors') {
    return doorReducer(object, _p, _f);
  }
  return withText('You can\'t do that!');
};

export default moveReducer;
