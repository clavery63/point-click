import { compose } from 'redux';
import { setValue, withText } from './utils';

const startGameReducer = () => compose(
  setValue('menu')('NONE'),
  withText('Hi Mike. Welcome to birthday castle. We hope you find it comfortable inside.               You might even see some cool s*** along the way.')
);

export default startGameReducer;
