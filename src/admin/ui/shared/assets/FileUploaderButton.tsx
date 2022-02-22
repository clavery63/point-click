import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import FileUploader from './FileUploader';

type Props = {
  validate: (f: File) => Promise<void>;
  onSuccess: (f: File) => void;
  filePath: string;
};
const FileUploaderButton = ({ validate, onSuccess, filePath }: Props) => {
  const [open, setOpen] = useState(false);
  const [waiting, setWaiting] = useState(false);

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        onClick={() => setOpen(true)}
      >
        Upload New
        {' '}
        {filePath}
      </Button>
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
