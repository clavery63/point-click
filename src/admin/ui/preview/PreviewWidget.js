import { Box } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import Item from './Item';
import Scenery from './Scenery';
import useStyles from './useStyles';
import Draggable from '../shared/Draggable';
import assetsPathSelector from 'admin/store/selectors/assetsSelector';

const ObjectGroup = ({ Component, ids }) => (
  <Box>
    {ids.map(id => (
      <Component
        key={id}
        id={id}
        Behavior={Draggable}
      />
    ))}
  </Box>
);

const Background = ({ imageKey }) => {
  const classes = useStyles();
  const { getImage } = useSelector(assetsPathSelector);
  // TODO: set opactity to 0.5 when editing a single object
  return (
    <img
      className={classes.background}
      src={getImage(imageKey)}
      draggable={false}
      alt={imageKey}
    />
  );
};

const PreviewWidget = props => {
  const { doors, items, scenery, img } = props.room;
  const roomImg = useSelector(state => state.gameState.images[img]);
  const classes = useStyles();

  return (
    <Box className={classes.viewport}>
      <Background imageKey={img} />
      {/* <ObjectGroup ids={doors} collection={'doors'} /> */}
      <ObjectGroup ids={items} Component={Item} />
      <ObjectGroup ids={scenery} Component={Scenery} />
    </Box>
  );
};

export default PreviewWidget;
