import { setValue } from './utils';


/**
 * TODO: let's really try to move this out of redux because while it's not a 
 * _guaranteed_ performance hit, it definitiely makes messing things up more likely
 */
const setPositionReducer = ({ x, y, id, type }) => {
  return setValue(`gameState.${type}.${id}.currentPosition`)({ left: x, top: y });
};

export default setPositionReducer;
