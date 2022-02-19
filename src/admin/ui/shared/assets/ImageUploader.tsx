import React from 'react';
import FileUploaderButton from './FileUploaderButton';

const MAX_IMAGE_SIZE = 112;

type GetImageDimensions = (f: File) => Promise<{ width: number; height: number}>;
const getImageDimensions: GetImageDimensions = file => new Promise((resolve, reject) => {
  const dataUrl = window.URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    resolve({
      height: img.height,
      width: img.width,
    });
  };
  img.onerror = () => {
    reject(new Error('Damn. Something was wrong with that image I guess.'));
  };
  img.src = dataUrl;
});

const validate = async (file: File) => {
  const { width, height } = await getImageDimensions(file);
  if (width > MAX_IMAGE_SIZE || height > MAX_IMAGE_SIZE) {
    throw new Error(`Dammit, the image is too big(${width} x ${height}).
        The max size is ${MAX_IMAGE_SIZE} x ${MAX_IMAGE_SIZE}`);
  }
  if (width === 0 || height === 0) {
    throw new Error('Unable to get dimensions of this image. Is it the right format?');
  }
};

type Props = {
  onSuccess: (file: File) => void;
};
const ImageUploader = ({ onSuccess }: Props) => {
  return (
    <FileUploaderButton
      validate={validate}
      onSuccess={onSuccess}
    />
  );
};

export default ImageUploader;
