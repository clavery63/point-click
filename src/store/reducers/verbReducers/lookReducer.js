import { withText, setValue } from '../utils';

const lookReducer = (object, playerState, flags) => {
  if (object.moveOn === 'LOOK') {
    if (!object.activeFlag || flags.has(object.activeFlag)) {
      return setValue('transition')({ 
        dest: object.movesTo, 
        dir: object.moveDir
      });
    }
  }
  return withText(object.description);
};

export default lookReducer;
