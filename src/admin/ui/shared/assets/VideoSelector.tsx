import React, { useEffect, useState } from 'react';
import { Nullable } from 'game/store/types';
import S3 from 'shared/util/S3';
import { useParams } from 'react-router-dom';
import getFilenames from 'shared/util/getFilenames';
import { Stack } from '@mui/material';
import Selector, { makeOptions } from '../Selector';
import VideoUploader from './VideoUploader';
import WithTooltip from '../WithTooltip';
// import VideoUploader from './VideoUploader';

const loadVideos = async (gameName: string) => {
  // TODO: this is almost the same as loadAudios
  const s3 = new S3(`${gameName}/video`);
  const objects = await s3.listObjects();

  return getFilenames(objects || [], `${gameName}/video/(.*)`);
};

type Props = {
  label: string;
  value: Nullable<string>;
  onChange: (value: string) => void;
  tooltip?: string;
};
const VideoSelector = ({
  label, value, onChange, tooltip,
}: Props) => {
  const { gameName } = useParams<{ gameName: string }>();
  const [options, setOptions] = useState<Nullable<string[]>>(null);

  useEffect(() => {
    loadVideos(gameName).then(setOptions);
  }, []);

  const handleUploadSuccess = (file: File) => {
    setOptions(oldOptions => [...(oldOptions || []), file.name]);
    onChange(file.name);
  };

  if (!options) {
    return null;
  }

  return (
    <Stack direction="row" spacing={2}>
      <WithTooltip text={tooltip}>
        <Selector
          label={label}
          value={options.length ? (value || '') : ''}
          onChange={onChange}
          options={makeOptions(options)}
        />
      </WithTooltip>
      <VideoUploader
        onSuccess={handleUploadSuccess}
      />
    </Stack>
  );
};

export default VideoSelector;
