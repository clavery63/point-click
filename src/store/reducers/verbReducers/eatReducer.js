import { compose } from 'lodash/fp';
import { withText, updateValue, setValue } from '../utils';

const eatReducer = object => state => {
  if (object.moveOn === 'EAT') {
    return setValue('transition')({ 
      dest: object.movesTo, 
      dir: object.moveDir, 
      frame: 0
    })(state);
  }

  if (object.eatText) {
    return withText(object.eatText)(state);
  }

  if (!object.onEat) {
    return withText('Don\'t eat that')(state);
  }
  
  const room = state.playerState.room;
  return compose(
    updateValue(`gameState.rooms.${room}.items`)(items => {
      return items.filter(id => id !== object.id);
    }),
    updateValue('gameState.flags')(flags => {
      if (object.eatEffect) {
        flags.add(object.eatEffect);
      }
      return flags;
    }),
    withText(object.onEat),
  )(state);
};


export default eatReducer;
