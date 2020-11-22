import { setValue } from './utils';

const setPositionReducer = ({ x, y, id, type }) => {
  return setValue(`gameState.${type}.${id}.currentPosition`)({ left: x, top: y });
};

export default setPositionReducer;
