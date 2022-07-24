import React from 'react';
import TextField from '@mui/material/TextField';
import { Nullable } from 'game/store/types';
import WithTooltip from './WithTooltip';

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
  return (
    <WithTooltip text={tooltip}>
      <TextField
        label={label}
        margin="normal"
        multiline
        fullWidth={fullWidth}
        maxRows={6}
        value={value || ''}
        onChange={e => {
          window.setTimeout(() => {
            if (e.target.value === '') {
              onChange(undefined);
            } else {
              onChange(e.target.value);
            }
          }, 1000);
        }}
        variant="outlined"
      />
    </WithTooltip>
  );
};

export default LongTextField;
