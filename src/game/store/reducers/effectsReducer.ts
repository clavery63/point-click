import { compose } from 'redux';
import { StateTransformer } from 'shared/util/types';
import { Effect, VerbLogic } from '../types';
import { setValue, keepState } from './utils';

type RunEffect = (e: Effect) => StateTransformer;
const runEffect: RunEffect = ({ action, path, value }) => {
  switch (action) {
    case 'SET_NUMBER_VALUE':
      return setValue(path)(value);
    default:
      return keepState();
  }
};

type EffectsReducer = (v: VerbLogic) => StateTransformer;
const effectsReducer: EffectsReducer = ({ effects = [] }) => {
  return compose(...effects.map(runEffect));
};

export default effectsReducer;
