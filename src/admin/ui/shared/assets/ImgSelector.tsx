import React from 'react';
import { Nullable } from 'game/store/types';
import { Stack } from '@mui/material';
import { addImage } from 'admin/store/reducers/gameStateReducer/imagesReducer';
import { useDispatch, useSelector } from '../../hooks/redux';
import ImageUploader from './ImageUploader';
import Selector, { makeOptions } from '../Selector';

type Props = {
  label: string;
  value: Nullable<string>;
  onChange: (value: string) => void;
  tooltip?: string;
};
const ImgSelector = ({
  label, value, onChange, tooltip,
}: Props) => {
  const dispatch = useDispatch();
  const images = useSelector(state => state.gameState.present.images);
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
    <Stack direction="row" spacing={2}>
      <Selector
        label={label}
        value={value}
        onChange={onChange}
        options={makeOptions(options)}
        tooltip={tooltip}
      />
      <ImageUploader
        onSuccess={handleUploadSuccess}
      />
    </Stack>
  );
};

export default ImgSelector;
