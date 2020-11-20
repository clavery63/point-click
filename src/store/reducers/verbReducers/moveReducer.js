import { withText, setValue } from '../utils';

const doorReducer = ({ state, dest, dir }) => {
  switch (state) {
    case 'OPEN':
      return setValue('transition')({ dest, dir, frame: 0 });
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
