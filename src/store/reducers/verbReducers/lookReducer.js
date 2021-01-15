import { withText, setValue } from '../utils';

const lookReducer = object => {
  if (!object.movesTo) {
    return withText(object.description);
  }

  return setValue('transition')({ 
    dest: object.movesTo, 
    dir: object.moveDir, 
    frame: 0
  })
}

export default lookReducer;
