import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { Nullable } from 'game/store/types';
import FileUploader from './FileUploader';

type Props = {
  validate: (f: File) => Promise<Nullable<string>>;
  onSuccess: (f: File) => void;
  filePath: string;
};
const FileUploaderButton = ({ validate, onSuccess, filePath }: Props) => {
  const [open, setOpen] = useState(false);
  const [waiting, setWaiting] = useState(false);

  return (
    <>
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          color="primary"
          onClick={() => setOpen(true)}
        >
          Upload New
          {' '}
          {filePath}
        </Button>
      </Box>
      <Dialog
        open={open}
        onClose={() => {
          if (!waiting) {
            setOpen(false);
          }
        }}
        maxWidth={false}
        hideBackdrop
      >
        <DialogContent>
          <FileUploader
            validate={validate}
            onSuccess={onSuccess}
            filePath={filePath}
            setWaiting={setWaiting}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FileUploaderButton;
