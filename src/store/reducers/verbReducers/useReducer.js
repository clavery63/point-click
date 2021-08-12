import { compose } from 'lodash/fp';
import { withText, setValue, clearValue, filterValues, combineReducers, when } from '../utils';
import genericVerbReducer from './genericVerbReducer';

const useDoorReducer = (object, playerState) => {
  if (playerState.using === object.keyId) {
    return compose(
      setValue(`gameState.doors.${object.id}.state`)('CLOSED'),
      withText(object.unlockText)
    );
  }

  return withText('Damn. Wrong key. The damned door is still locked.');
};

const forfeitItemReducer = (object, playerState) =>
  when(!object.retainUsing)(filterValues(`playerState.items`)(playerState.using));

  /**
   * TODO: It wouldn't be too crazy to make this generic. like you select what
   * action to trigger with what parameters. It would be totally serializable,
   * and way safer that an eval because we control the function mapping
   * Something like:
   * 
   * use: [{
   *   text: 'you emptied your bag'
   *   effect: {
   *     action: 'setValue',
   *     parameters: ['playerState.timer', 0]
   *   }
   * }]
   */
const bagReducer = object =>
  when(object.name === 'pumpkin')(setValue('playerState.bagLevel')(0));

const extraReducers = combineReducers(forfeitItemReducer, bagReducer);

const useReducerForType = type => {
  if (type === 'doors') {
    return useDoorReducer;
  }

  return genericVerbReducer('use', () => 'That ain\'t workin!\'!', extraReducers)
};

const useReducer = type => combineReducers(
  useReducerForType(type),
  () => clearValue('playerState.using')
);

export default useReducer;
