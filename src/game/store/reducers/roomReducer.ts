import { compose } from 'redux';
import { ParentReducer } from 'shared/util/types';
import { setValue, updateValue } from './utils';

const roomReducer: ParentReducer<number> = payload => compose(
  setValue('playerState.room')(payload),
  // TODO NOW: every item (potentially) has its own timer. update them all here
  // Probably need a new multi-update util function
  updateValue('worldState.entities[74].time')(time => (time ?? 0) + 1),
  setValue(`worldState.rooms[${payload}].initialDescription`)(null),
);

export default roomReducer;
