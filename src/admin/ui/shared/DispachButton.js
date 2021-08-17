import React from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import useStyles from './useStyles';

const DispatchButton = ({ action, callToAction, payload }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const onClick = () => dispatch({ type: action, payload });

  return (
    <Button 
      variant="contained" 
      onClick={onClick}
      className={styles.field}
    >
      {callToAction}
    </Button>
  )
};

export default DispatchButton;
