import React, { ChangeEvent } from 'react';
import { Nullable } from 'game/store/types';
import FormControl from '@material-ui/core/FormControl';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import { useSelector } from '../../hooks/redux';

type Props = {
  label: string;
  value: Nullable<string>;
  onChange: (e: ChangeEvent<any>) => void;
};
const ImgSelector = ({ label, value, onChange }: Props) => {
  const images = useSelector(state => state.gameState.images);
  const keys = Object.keys(images);
  return (
    <FormControl variant="outlined">
      <InputLabel>img</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={onChange}
      >
        {keys.map(key => (
          <MenuItem value={key} key={key}>{key}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ImgSelector;
