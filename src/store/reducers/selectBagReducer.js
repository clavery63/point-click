import { compose } from 'redux';
import { withText, setValue } from './utils';

const getText = bagLevel => {
  if (bagLevel < 2) {
    return 'It\'s your bag. You must take care to empty it every now and then. Otherwise, bad things can happen.';
  } else if (bagLevel < 5) {
    return 'Ah, your bag. Still a long way to go before it poses any threat.';
  } else if (bagLevel < 8) {
    return 'Your bag is filling up faster than you expected. You had better find some place to empty it!';
  } else if (bagLevel < 11) {
    return 'You don\'t know and frankly don\'t want to know what will happen if the bag ruptures';
  } else if (bagLevel < 13) {
    return 'The bag contains near-critical levels of piss. If you don\'t empty it soon, it will explode, I guess?';
  } else if (bagLevel < 17) {
    return 'Not much time left... Empty your bag now!';
  }

  return 'It\'s going to burst any second!';
};

const defaultReducer = () => withText('That is not something you can do with your bag.');
const lookReducer = bagLevel => withText(getText(bagLevel));

const useReducer = () => {
  return compose(
    withText('So you\'ve decided to use your bag... What would you like to use it on?'),
    setValue('playerState.using')('BAG')
  );
};

const getReducer = verb => {
  switch (verb) {
  case 'LOOK':
    return lookReducer;
  case 'USE':
    return useReducer;
  default:
    return defaultReducer;
  }
};

const selectBagReducer = bagLevel => state => {
  const { playerState } = state;
  const reducer = getReducer(playerState.verb)
  return reducer(bagLevel)(state);
};

export default selectBagReducer;
