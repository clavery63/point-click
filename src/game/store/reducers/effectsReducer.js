import { compose } from 'lodash/fp';
import { setValue, keepState } from './utils';

const effectsMap = {
  setValue
};

/**
 * This is what happens when there's no one around to talk me out of this kind
 * of shit
 */
const runEffect = ({ action, parameters }) => {
  const effect = effectsMap[action];
  if (!effect) {
    return keepState();
  }

  return parameters.reduce((partial, param) => partial(param), effect);
};

const effectsReducer = ({ effects = [] }) => {
  return compose(...effects.map(runEffect));
};

export default effectsReducer;
