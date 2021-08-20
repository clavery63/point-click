import React from 'react';
import { useSelector } from 'react-redux';
import assetsPathSelector from 'admin/store/selectors/assetsSelector';
import useStyles from './useStyles';
import { SCALE } from './constants';

const Item = ({ id, Behavior }) => {
  const classes = useStyles();
  const { getImage } = useSelector(assetsPathSelector);
  const { img, position } = useSelector(state => {
    return state.gameState.worldState.items[id];
  });

  const style = {
    left: position.left * SCALE,
    top: position.top * SCALE,
    width: position.width * SCALE,
    height: position.height * SCALE,
  };

  return (
    <Behavior position={position} id={id} type='ITEM'>
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

Item.defaultProps = {
  Behavior: ({ children }) => (<>{children}</>)
}

export default Item;
