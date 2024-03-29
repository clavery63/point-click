import React from 'react';
import Button from '@mui/material/Button';
import { useDispatch } from '../hooks/redux';

type Props = {
  action: any; // TODO: maybe fix one day?
  callToAction: string;
  color?: 'primary' | 'secondary' | 'info';
  disabled?: boolean;
};
const DispatchButton = (props: Props) => {
  const {
    action, callToAction, color = 'info', disabled = false,
  } = props;
  const dispatch = useDispatch();
  const onClick = () => dispatch(action);

  return (
    <Button
      variant="contained"
      color={color}
      disabled={disabled}
      onClick={onClick}
      sx={{ ml: 1, mr: 1 }}
    >
      {callToAction}
    </Button>
  );
};

export default DispatchButton;
