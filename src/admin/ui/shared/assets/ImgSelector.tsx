import React, { useState } from 'react';
import { Nullable } from 'game/store/types';
import { FormHelperText, Stack } from '@mui/material';
import { addImage } from 'admin/store/reducers/imagesReducer';
import { useDispatch, useSelector } from '../../hooks/redux';
import ImageUploader from './ImageUploader';
import Selector, { makeOptions } from '../Selector';
import { validateImage } from './imageUtils';

type Props = {
  label: string;
  value: Nullable<string>;
  onChange: (value: string) => void;
  tooltip?: string;
  width?: number;
  height?: number;
  exactSize?: boolean;
};
const ImgSelector = ({
  label, value, onChange, tooltip, width, height, exactSize,
}: Props) => {
  const dispatch = useDispatch();
  const images = useSelector(state => state.images);
  const [error, setError] = useState<Nullable<string>>(null);
  const options = Object.keys(images);

  const onSelect = async (fileName: string) => {
    setError(null);
    const image = images[fileName];
    if (!image) {
      return;
    }

    const validationError = await validateImage(
      image.width,
      image.height,
      width,
      height,
      exactSize,
    );

    if (validationError) {
      setError(validationError);
      return;
    }

    onChange(fileName);
  };

  const handleUploadSuccess = (file: File) => {
    setError(null);
    const name = file.name.split('.')[0];
    const dataUrl = window.URL.createObjectURL(file);
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      dispatch(addImage({ name, img }));
      onChange(name);
    };
    img.onerror = () => {
      setError('Dag nabbit! uploaded an image but something went wrong after that');
    };
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Selector
          label={label}
          value={value}
          onChange={onSelect}
          options={makeOptions(options)}
          tooltip={tooltip}
        />
        <ImageUploader
          onSuccess={handleUploadSuccess}
          width={width}
          height={height}
          exactSize={exactSize}
        />
      </Stack>
      {error && <FormHelperText error>{error}</FormHelperText>}
    </>
  );
};

export default ImgSelector;
