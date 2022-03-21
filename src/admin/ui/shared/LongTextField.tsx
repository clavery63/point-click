import React from 'react';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';
import { Nullable } from 'game/store/types';
import Help from '@mui/icons-material/Help';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  tooltip: {
    position: 'absolute',
    top: '2px',
    right: '10px',
    cursor: 'pointer',
    padding: '2px',
    backgroundColor: 'white',
  },
  icon: {
    height: '20px',
  },
});

type Props = {
  label: string;
  value: Nullable<string>;
  onChange: (value: Nullable<string>) => void;
  fullWidth?: boolean;
  tooltip?: string;
};
const LongTextField = ({
  label, value, onChange, fullWidth = true, tooltip,
}: Props) => {
  const classes = useStyles();
  return (
    <Box style={{ position: 'relative' }}>
      <TextField
        label={label}
        margin="normal"
        multiline
        fullWidth={fullWidth}
        maxRows={6}
        value={value || ''}
        onChange={e => {
          if (e.target.value === '') {
            onChange(undefined);
          } else {
            onChange(e.target.value);
          }
        }}
        variant="outlined"
      />
      {tooltip && (
        <Tooltip title={tooltip}>
          <Box className={classes.tooltip}>
            <Icon>
              <Help fontSize="small" />
            </Icon>
          </Box>
        </Tooltip>
      )}
    </Box>
  );
};

export default LongTextField;
