import { DoorState } from 'game/store/types';
import { compose } from 'redux';
import { DoorReducer, EntityReducer } from 'shared/util/types';
import { withText, setValue, clearValue } from '../utils';

const doorReducer: DoorReducer = ({ state, dest, dir }) => {
  switch (state) {
    case DoorState.OPEN:
      return compose(
        clearValue('playerState.examining'),
        setValue('transition')({ dest, dir }),
      );
    default:
      return withText('You have to open the door before you go through it.');
  }
};

const moveReducer: EntityReducer = (object, _p, _f) => {
  if (object.type === 'doors') {
    return doorReducer(object, _p, _f);
  }
  // TODO: No reason entities can't respond to move as well.
  // Can we make this just use generic reducer?
  // - One hack would just be to make DoorState auto-generated flag (e.g. DOOR_1_OPEN).
  //   Not necessarily the craziest thing in the world (we can abstract this in the editor tool)
  // - Another big idea would be to introduce arbitrary, user-controled variables on all entities
  //   Which we would also abstract away in the editor tool for doors
  return withText('You can\'t do that!');
};

export default moveReducer;
