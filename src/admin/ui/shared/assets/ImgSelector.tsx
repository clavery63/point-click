import React from 'react';
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
  onChange: (value: string) => void;
};
const ImgSelector = ({ label, value, onChange }: Props) => {
  const dispatch = useDispatch();
  const images = useSelector(state => state.gameState.images);
  const options = Object.keys(images);

  const handleUploadSuccess = (file: File) => {
    const name = file.name.split('.')[0];
    const dataUrl = window.URL.createObjectURL(file);
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      dispatch(addImage({ name, img }));
      onChange(name);
    };
    img.onerror = () => {
      console.log('Dag nabbit! uploaded an image but something went wrong after that');
    };
  };

  return (
    <Grid container>
      <Grid item xs={4}>
        <Selector
          label={label}
          value={value}
          onChange={onChange}
          options={options}
        />
      </Grid>
      <Grid item xs={8} style={{ display: 'flex', alignItems: 'center' }}>
        <ImageUploader
          onSuccess={handleUploadSuccess}
        />
      </Grid>
    </Grid>
  );
};

export default ImgSelector;
