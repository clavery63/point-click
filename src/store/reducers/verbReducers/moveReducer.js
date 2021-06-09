import { compose } from 'lodash/fp';
import { withText, setValue, clearValue } from '../utils';

const doorReducer = ({ state, dest, dir }) => {
  switch (state) {
    case 'OPEN':
      return compose(
        clearValue('playerState.examining'),
        setValue('transition')({ dest, dir, frame: 0 })
      );
    default:
      return withText('You have to open the door before you go through it.');
  }
};

const moveReducer = object => {
  if (object.type === 'doors') {
    return doorReducer(object);
  }
  return withText('You can\'t do that!');
};


export default moveReducer;
