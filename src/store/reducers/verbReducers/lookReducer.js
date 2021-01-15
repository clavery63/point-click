import { withText, setValue } from '../utils';

const lookReducer = object => {
  if (object.moveOn === 'LOOK') {
    return setValue('transition')({ 
      dest: object.movesTo, 
      dir: object.moveDir, 
      frame: 0
    });
  }

  return withText(object.description);
};

export default lookReducer;
