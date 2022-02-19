import React, { ChangeEvent } from 'react';
import { Nullable } from 'game/store/types';
import {
  Grid,
} from '@material-ui/core';
import { addImage } from 'admin/store/reducers/gameStateReducer/imagesReducer';
import { useDispatch, useSelector } from '../../hooks/redux';
import ImageUploader from './ImageUploader';
import Selector from '../Selector';

type Props = {
  label: string;
  value: Nullable<string>;
  onChange: (e: ChangeEvent<any>) => void;
};
const ImgSelector = ({ label, value, onChange }: Props) => {
  const dispatch = useDispatch();
  const images = useSelector(state => state.gameState.images);
  const options = Object.keys(images);
  return (
    <Grid container>
      <Grid item xs={3}>
        <Selector
          label={label}
          value={value}
          onChange={onChange}
          options={options}
        />
      </Grid>
      <Grid item xs={9} style={{ display: 'flex', alignItems: 'center' }}>
        <ImageUploader
          onSuccess={(file: File) => {
            dispatch(addImage({ file }));
          }}
        />
      </Grid>
    </Grid>
  );
};

export default ImgSelector;
