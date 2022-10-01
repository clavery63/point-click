import React from 'react';
import { Box, FormControlLabel, Switch } from '@mui/material';
import WithTooltip from './WithTooltip';

type Props = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  tooltip?: string;
};
const Toggle = React.memo(({
  label, value, onChange, tooltip,
}: Props) => {
  return (
    <Box style={{ float: 'left' }}>
      <WithTooltip text={tooltip} top="-3px">
        <FormControlLabel
          style={{ paddingRight: '20px', marginTop: '-1px' }}
          control={(
            <Switch
              checked={value}
              onChange={e => onChange(e.currentTarget.checked)}
            />
          )}
          label={label}
        />
      </WithTooltip>
    </Box>
  );
});

Toggle.displayName = 'Toggle';

export default Toggle;
