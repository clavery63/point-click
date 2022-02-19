import React from 'react';
import FileUploaderButton from './FileUploaderButton';

const MAX_SIZE = 10 * 1024 * 1024; // 10MB;

type GetImageDimensions = (f: File) => Promise<{ duration: number}>;
const getAudioDuration: GetImageDimensions = file => new Promise((resolve, reject) => {
  const dataUrl = window.URL.createObjectURL(file);
  const audio = new Audio();
  audio.onloadeddata = () => {
    resolve({
      duration: audio.duration,
    });
  };
  audio.onerror = () => {
    reject(new Error('Well that\'s just some bad audio. Probably? I don\'t really know.'));
  };
  audio.src = dataUrl;
});

const validate = async (file: File) => {
  const { duration } = await getAudioDuration(file);

  if (file.size > MAX_SIZE) {
    throw new Error(`Whoa hold up. Your file is ${file.size}, which is bigger than the max of ${MAX_SIZE}`);
  }

  if (duration === 0) {
    throw new Error('Looks like your audio has no duration. That\'s messed up, so I\'m gonna bail');
  }
};

type Props = {
  onSuccess: (file: File) => void;
};
const AudioUploader = ({ onSuccess }: Props) => {
  return (
    <FileUploaderButton
      validate={validate}
      onSuccess={onSuccess}
      filePath="audio"
    />
  );
};

export default AudioUploader;
