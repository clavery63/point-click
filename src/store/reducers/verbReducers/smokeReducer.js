import { compose } from 'lodash/fp';
import { withText, updateValue, setValue } from '../utils';

const smokeReducer = object => state => {
  if (object.moveOn === 'SMOKE') {
    return setValue('transition')({ 
      dest: object.movesTo, 
      dir: object.moveDir, 
      frame: 0
    })(state);
  }

  if (object.name === 'garfield') {
    return withText('Smoking Garfiled is illegal in this state')(state);
  }

  if (!object.onEat) {
    return withText(`Smoking ${object.name} simply isn't going to work. It's too logistically difficult.`)(state);
  }
  
  const room = state.playerState.room;
  return compose(
    updateValue(`gameState.rooms.${room}.items`)(items => {
      return items.filter(id => id !== object.id);
    }),
    withText(object.onEat)
  )(state);
};


export default smokeReducer;
