import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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

enum UploadStatus {
  NONE,
  IN_PROGRESS,
  SUCCESS,
  ERROR
}

const statusTexts = {
  [UploadStatus.IN_PROGRESS]: 'Uploading...',
  [UploadStatus.SUCCESS]: 'Done!',
  [UploadStatus.ERROR]: 'Awww, I did bad :(',
};

type DropAreaProps = {
  onDrop: (f: any) => Promise<void>;
};
const DropArea = ({ onDrop }: DropAreaProps) => {
  const styles = useStyles();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Box {...getRootProps()} className={styles.uploader}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop files here</p>
      ) : (
        <p>Drop files here, or click to select files</p>
      )}
    </Box>
  );
};

type MessageBoxProps = { text: string };
const MessageBox = ({ text }: MessageBoxProps) => {
  const styles = useStyles();
  return (
    <Box className={styles.uploader}>
      <p>{text}</p>
    </Box>
  );
};

type Props = {
  validate: (f: File) => Promise<void>;
  onSuccess: (f: File) => void;
  setWaiting: (b: boolean) => void;
  filePath: string;
};
const FileUploader = ({
  validate, onSuccess, filePath, setWaiting,
}: Props) => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState<UploadStatus>(UploadStatus.NONE);
  const { gameName } = useParams<{ gameName: string}>();

  const onDrop = useCallback(async acceptedFiles => {
    try {
      setWaiting(true);
      setStatus(UploadStatus.IN_PROGRESS);
      const file = acceptedFiles[0];
      await validate(file);
      const s3 = new S3(gameName);
      const path = `${filePath}/${file.name}`;
      await s3.writeObject(path, file);
      onSuccess(file);
      setStatus(UploadStatus.SUCCESS);
    } catch (e: any) {
      setStatus(UploadStatus.ERROR);
      setError(e.message);
    } finally {
      setWaiting(false);
    }
  }, []);

  return (
    <Box>
      {status === UploadStatus.NONE && <DropArea onDrop={onDrop} />}
      {status !== UploadStatus.NONE && <MessageBox text={statusTexts[status]} />}
      <Typography>{error}</Typography>
    </Box>
  );
};

export default FileUploader;
