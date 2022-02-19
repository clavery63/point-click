import { makeStyles, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useParams } from 'react-router-dom';
import S3 from 'shared/util/S3';

const useStyles = makeStyles({
  uploader: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    cursor: 'pointer',
  },
});

type Props = {
  validate: (f: File) => Promise<void>;
  onSuccess: (f: File) => void;
  filePath: string;
};
const FileUploader = ({ validate, onSuccess, filePath }: Props) => {
  const styles = useStyles();
  const [error, setError] = useState(null);
  const { gameName } = useParams<{ gameName: string}>();

  const onDrop = useCallback(async acceptedFiles => {
    const file = acceptedFiles[0];
    try {
      await validate(file);
      const s3 = new S3(gameName);
      const path = `${filePath}/${file.name}`;
      await s3.writeObject(path, file);
      onSuccess(file);
    } catch (e: any) {
      setError(e.message);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box>
      <Box {...getRootProps()} className={styles.uploader}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop &#39;em!</p>
        ) : (
          <p>Drop files here, or click to select files</p>
        )}
      </Box>
      <Typography>{error}</Typography>
    </Box>
  );
};

export default FileUploader;
