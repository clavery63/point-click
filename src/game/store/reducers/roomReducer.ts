import { compose } from 'redux';
import { setValue, updateValue } from './utils';

const roomReducer = (payload: number) => compose(
  setValue('playerState.room')(payload),
  updateValue('playerState.timer')(time => time + 1),
  setValue(`worldState.rooms[${payload}].initialDescription`)(null)
);

export default roomReducer;
