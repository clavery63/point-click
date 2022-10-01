import React from 'react';
import { Nullable } from 'game/store/types';
import FormControl from '@mui/material/FormControl';
import {
  Box, InputLabel, MenuItem, Select,
} from '@mui/material';
import WithTooltip from './WithTooltip';

export const makeOptions = (options: string[]) => {
  return options.map(option => ({ value: option, label: option }));
};

const isEmpty = (value: any) => value === undefined || value === null;

type Option = { value: string | number; label: string };

type Props = {
  label: string;
  value: Nullable<string | number>;
  onChange: (value: any) => void;
  options: Option[];
  required?: boolean;
  style?: React.CSSProperties;
  tooltip?: string;
};
const Selector = React.memo(({
  label, value, onChange, options, required = false, style, tooltip,
}: Props) => {
  return (
    <Box style={{ display: 'flex', flexDirection: 'row' }}>
      <WithTooltip text={tooltip}>
        <FormControl variant="outlined" style={{ minWidth: 140 }} margin="normal">
          <InputLabel>{label}</InputLabel>
          <Select
            value={isEmpty(value) ? '' : value}
            label={label}
            onChange={e => {
              if (e.target.value === '') {
                onChange(undefined);
              } else {
                onChange(e.target.value);
              }
            }}
            style={style}
          >
            {!required && <MenuItem value="" key=""><em>none</em></MenuItem>}
            {options.map(option => (
              <MenuItem value={option.value} key={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </WithTooltip>
    </Box>
  );
});

Selector.displayName = 'Selector';

export default Selector;
