import { compose } from 'redux';
import { StateTransformer } from 'shared/util/types';
import { Effect, VerbLogic } from '../types';
import { setValue, keepState } from './utils';

type RunEffect = (e: Effect) => StateTransformer;
const runEffect: RunEffect = effect => {
  switch (effect.action) {
    case 'SET_NUMBER_VALUE':
      return setValue(effect.path)(effect.value);
    case 'SET_MUSIC':
      return setValue('transient.nextMusic')(effect.value);
    default:
      return keepState();
  }
};

type EffectsReducer = (v: VerbLogic) => StateTransformer;
const effectsReducer: EffectsReducer = ({ effects = [] }) => {
  return compose(...effects.map(runEffect));
};

export default effectsReducer;
