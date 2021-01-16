import { withText, setValue } from '../utils';

const lookReducer = object => state => {
  if (object.moveOn === 'LOOK' || state.gameState.flags.has(object.activeFlag)) {
    return setValue('transition')({ 
      dest: object.movesTo, 
      dir: object.moveDir, 
      frame: 0
    })(state);
  }
  return withText(object.description)(state);
};

export default lookReducer;
