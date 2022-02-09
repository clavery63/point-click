import React from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch } from '../hooks/redux';
import useStyles from './useStyles';

type Props = {
  action: any; // TODO: maybe fix one day?
  callToAction: string;
  color?: 'primary' | 'secondary' | 'default';
  disabled?: boolean;
};
const DispatchButton = (props: Props) => {
  const {
    action, callToAction, color = 'default', disabled = false,
  } = props;
  const styles = useStyles();
  const dispatch = useDispatch();
  const onClick = () => dispatch(action);

  return (
    <Button
      variant="contained"
      color={color}
      disabled={disabled}
      onClick={onClick}
      className={styles.field}
    >
      {callToAction}
    </Button>
  );
};

export default DispatchButton;
