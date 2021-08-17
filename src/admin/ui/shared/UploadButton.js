import React from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import useStyles from './useStyles';

const UploadButton = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const onClick = () => dispatch({ type: 'UPLOAD_GAME' });

  return (
    <Button 
      variant="contained" 
      onClick={onClick}
      className={styles.field}
    >
      Save
    </Button>
  )
};

export default UploadButton;
