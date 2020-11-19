import { compose } from 'redux';
import { setValue, withText } from './utils';

const useReducer = id => compose(
  withText('What would you like to use this on?'),
  setValue('playerState.using')(id)
);

const defaultReducer = () => withText('You seem to be wasting your time');

const selectItemReducer = id => state => {
  const { playerState } = state;
  /**
   * TODO: display item description if verb is LOOK
   */
  const reducer = playerState.verb === 'USE' ? useReducer : defaultReducer;
  return reducer(id)(state);
};

export default selectItemReducer;
