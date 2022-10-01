import React from 'react';
import Box from '@mui/material/Box';
import EntityDetails from './EntityDetails';
import useStyles from '../shared/useStyles';
import ObjectsSummary from './ObjectsSummary';

const EntityPane = () => {
  const styles = useStyles();
  return (
    <Box className={styles.rightColumn}>
      <ObjectsSummary />
      <EntityDetails />
    </Box>
  );
};

export default EntityPane;
