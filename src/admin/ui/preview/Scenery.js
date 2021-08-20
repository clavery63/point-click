import React from 'react';
import { useSelector } from 'react-redux';
import assetsPathSelector from 'admin/store/selectors/assetsSelector';
import useStyles from './useStyles';
import { SCALE } from './constants';

const Scenery = ({ id, Behavior }) => {
  const classes = useStyles();
  const { getImage } = useSelector(assetsPathSelector);
  const { img, startPosition } = useSelector(state => {
    return state.gameState.worldState.scenery[id];
  });

  const style = {
    left: startPosition.left * SCALE,
    top: startPosition.top * SCALE,
    width: startPosition.width * SCALE,
    height: startPosition.height * SCALE,
  };

  return (
    <Behavior 
      position={startPosition}
      id={id}
      type='SCENERY'
      field='startPosition'>
      <img
        className={classes.entity}
        alt={img}
        style={style}
        src={getImage(img)}
        draggable={false}
      />
    </Behavior>
  );
};

Scenery.defaultProps = {
  Behavior: ({ children }) => (<>{children}</>)
}

export default Scenery;
