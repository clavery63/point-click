import React from 'react';
import FileUploaderButton from './FileUploaderButton';
import { validateImageFile } from './imageUtils';

type Props = {
  onSuccess: (file: File) => void;
  width?: number;
  height?: number;
  exactSize?: boolean;
};
const ImageUploader = ({
  onSuccess, width, height, exactSize,
}: Props) => {
  return (
    <FileUploaderButton
      validate={file => validateImageFile(file, width, height, exactSize)}
      onSuccess={onSuccess}
      filePath="img"
    />
  );
};

export default ImageUploader;
