import { compose } from 'lodash/fp';
import { withText, updateValue, setValue, filterValues } from '../utils';

const eatReducer = (object, playerState) => {
  if (object.moveOn === 'EAT') {
    return setValue('transition')({ 
      dest: object.movesTo, 
      dir: object.moveDir
    });
  }

  if (object.eatText) {
    return withText(object.eatText);
  }

  if (!object.onEat) {
    return withText('Don\'t eat that');
  }
  
  const room = playerState.room;
  return compose(
    filterValues(`gameState.rooms.${room}.items`)(object.id),
    updateValue('gameState.flags')(flags => {
      if (object.eatEffect) {
        flags.add(object.eatEffect);
      }
      return flags;
    }),
    withText(object.onEat),
  );
};


export default eatReducer;
