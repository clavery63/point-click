import React from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch } from '../hooks/redux';
import useStyles from './useStyles';

type Props = {
  action: any; // TODO: maybe fix one day?
  callToAction: string;
};
const DispatchButton = ({ action, callToAction }: Props) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const onClick = () => dispatch(action);

  return (
    <Button
      variant="contained"
      onClick={onClick}
      className={styles.field}
    >
      {callToAction}
    </Button>
  );
};

export default DispatchButton;
