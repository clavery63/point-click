import { ParentReducer } from 'shared/util/types';
import { PositionType } from './rootReducer';
import { setValue } from './utils';

/**
 * TODO: let's really try to move this out of redux because while it's not a
 * _guaranteed_ performance hit, it definitiely makes messing things up more likely
 */
const setPositionReducer: ParentReducer<PositionType> = ({
  x, y, id,
}) => {
  return setValue(`worldState.entities[${id}].position`)({
    left: x,
    top: y,
  });
};

export default setPositionReducer;
