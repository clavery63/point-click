import { compose } from 'redux';
import { Reducer } from './rootReducer';
import { withText, setValue } from './utils';

const BAG_ID = 9999;

const getText = (bagLevel: number) => {
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
const lookReducer = (bagLevel: number) => withText(getText(bagLevel));

// TODO: is it worth making this generic, just like an opt-in timer component with a customizable image and text?
const useReducer = () => {
  return compose(
    withText('So you\'ve decided to use your bag... What would you like to use it on?'),
    setValue('playerState.using')(BAG_ID)
  );
};

const getReducer = (verb: string) => {
  switch (verb) {
  case 'LOOK':
    return lookReducer;
  case 'USE':
    return useReducer;
  default:
    return defaultReducer;
  }
};

const selectBagReducer: Reducer<number> = (bagLevel, playerState) => {
  const reducer = getReducer(playerState.verb)
  return reducer(bagLevel);
};

export default selectBagReducer;