import { compose } from 'redux';
import { ParentReducer } from 'shared/util/types';
import { setValue, updateValue } from './utils';

const roomReducer: ParentReducer<number> = payload => compose(
  setValue('playerState.room')(payload),
  updateValue('playerState.timer')(time => time + 1),
  setValue(`worldState.rooms[${payload}].initialDescription`)(null),
);

export default roomReducer;
