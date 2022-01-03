import { compose } from 'redux';
import { Reducer } from './rootReducer';
import { setValue, updateValue } from './utils';

const roomReducer: Reducer = (payload: number) => compose(
  setValue('playerState.room')(payload),
  updateValue('playerState.timer')(time => time + 1),
  setValue(`worldState.rooms[${payload}].initialDescription`)(null)
);

export default roomReducer;
