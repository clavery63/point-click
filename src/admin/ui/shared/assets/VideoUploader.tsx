import React from 'react';
import FileUploaderButton from './FileUploaderButton';

const MAX_SIZE = 10 * 1024 * 1024; // 10MB;

type GetVideoDuration = (f: File) => Promise<{ duration: number}>;
const getVideoDuration: GetVideoDuration = file => new Promise((resolve, reject) => {
  // TODO: This is almost the same as GetAudioDuration. just the constructor differs
  const dataUrl = window.URL.createObjectURL(file);
  const video = document.createElement('video');
  video.onloadeddata = () => {
    resolve({
      duration: video.duration,
    });
  };
  video.onerror = () => {
    reject(new Error('The video is busted, maybe'));
  };
  video.src = dataUrl;
});

const validate = async (file: File) => {
  const { duration } = await getVideoDuration(file);

  if (file.size > MAX_SIZE) {
    return `Whoa hold up. Your file is ${file.size}, which is bigger than the max of ${MAX_SIZE}`;
  }

  if (duration === 0) {
    return 'Looks like your video has no duration. That\'s messed up, so I\'m gonna bail';
  }

  return null;
};

type Props = {
  onSuccess: (file: File) => void;
};
const VideoUploader = ({ onSuccess }: Props) => {
  return (
    <FileUploaderButton
      validate={validate}
      onSuccess={onSuccess}
      filePath="video"
    />
  );
};

export default VideoUploader;
