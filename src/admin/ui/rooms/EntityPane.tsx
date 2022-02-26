import { Room } from 'game/store/types';
import React from 'react';
import Box from '@mui/material/Box';
import EntityDetails from './EntityDetails';
import useStyles from '../shared/useStyles';
import ObjectsSummary from './ObjectsSummary';

type Props = { room: Room };
const EntityPane = ({ room }: Props) => {
  const styles = useStyles();
  return (
    <Box className={styles.rightColumn}>
      <ObjectsSummary room={room} />
      <EntityDetails />
    </Box>
  );
};

export default EntityPane;
