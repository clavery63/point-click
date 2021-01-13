import { withText } from '../utils';

const hitReducer = object => {
  if (object.onHit) {
    return withText(object.onHit);
  }

  return withText('Ya blew it. That really hurt.');
};


export default hitReducer;
