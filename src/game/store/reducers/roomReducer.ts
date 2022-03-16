import { compose } from 'redux';
import { ParentReducer } from 'shared/util/types';
import { setValue, updateValue } from './utils';

const roomReducer: ParentReducer<number> = (payload, _, worldState) => compose(
  setValue('playerState.room')(payload),
  ...Object.values(worldState.entities).map(({ id }) => {
    return updateValue(`worldState.entities[${id}].time`)(time => (time ?? 0) + 1);
  }),
  setValue(`worldState.rooms[${payload}].initialDescription`)(null),
);

export default roomReducer;
