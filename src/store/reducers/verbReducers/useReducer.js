import { compose } from 'lodash/fp';
import { withText, setValue, clearValue, ifState } from '../utils';

const useReducer = ifState('playerState.using', (using, door) => using === door.need)(
  door => compose(
    setValue(`gameState.doors.${door.id}.state`)('CLOSED'),
    clearValue('playerState.using')(),
    withText(door.unlockText)
  ),
  () => compose(
    clearValue('playerState.using')(),
    withText('That ain\'t workin\'.')
  )
);

export default useReducer;
