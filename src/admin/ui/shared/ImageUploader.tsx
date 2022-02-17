import React from 'react';
import FileUploader from './FileUploader';

const MAX_IMAGE_SIZE = 112;

type GetImageDimensions = (f: File) => Promise<{ width: number; height: number}>;
const getImageDimensions: GetImageDimensions = file => new Promise(resolve => {
  const dataUrl = window.URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    resolve({
      height: img.height,
      width: img.width,
    });
  };
  img.src = dataUrl;
});

const validate = async (file: File) => {
  try {
    const { width, height } = await getImageDimensions(file);
    if (width > MAX_IMAGE_SIZE || height > MAX_IMAGE_SIZE) {
      throw new Error(`Dammit, the image is too big(${width} x ${height}).
        The max size is ${MAX_IMAGE_SIZE} x ${MAX_IMAGE_SIZE}`);
    }
    if (width === 0 || height === 0) {
      throw new Error('Unable to get dimensions of this image. Is it the right format?');
    }
    return file;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const ImageUploader = () => (
  <FileUploader validate={validate} />
);

export default ImageUploader;
