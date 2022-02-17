import Box from '@material-ui/core/Box';
import { Nullable } from 'game/store/types';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

// const styles = {
//   flex: 1,
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   padding: '20px',
//   borderWidth: 2,
//   borderRadius: 2,
//   borderColor: '#eeeeee',
//   borderStyle: 'dashed',
//   backgroundColor: '#fafafa',
//   color: '#bdbdbd',
//   outline: 'none',
//   transition: 'border .24s ease-in-out',
//   cursor: 'pointer',
// };

type Props = {
  validate: (f: File) => Promise<Nullable<File>>;
};
const FileUploader = ({ validate }: Props) => {
  const onDrop = useCallback(acceptedFiles => {
    validate(acceptedFiles[0]);
    // TODO: use S3.writeObject if the validation succeeds
    // call an onSuccess callback if that succeeds
    // keep error as state here and just display it
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop &#39;em!</p>
      ) : (
        <p>Drop files here, or click to select files</p>
      )}
    </Box>
  );
};

export default FileUploader;
