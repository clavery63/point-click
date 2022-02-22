import React, { useEffect, useState } from 'react';
import { Nullable } from 'game/store/types';
import Grid from '@mui/material/Grid';
import S3 from 'shared/util/S3';
import { useParams } from 'react-router-dom';
import getFilenames from 'shared/util/getFilenames';
import Selector from '../Selector';
import AudioUploader from './AudioUploader';

const loadAudios = async (gameName: string) => {
  const s3 = new S3(`${gameName}/audio`);
  const objects = await s3.listObjects();

  return getFilenames(objects || [], `${gameName}/audio/(.*)`);
};

type Props = {
  label: string;
  value: Nullable<string>;
  onChange: (value: string) => void;
};
const AudioSelector = ({ label, value, onChange }: Props) => {
  const { gameName } = useParams<{ gameName: string }>();
  const [options, setOptions] = useState<Nullable<string[]>>(null);

  useEffect(() => {
    loadAudios(gameName).then(setOptions);
  }, []);

  const handleUploadSuccess = (file: File) => {
    setOptions(oldOptions => [...(oldOptions || []), file.name]);
    onChange(file.name);
  };

  if (!options) {
    return null;
  }

  return (
    <Grid container>
      <Grid item xs={4}>
        <Selector
          label={label}
          value={options.length ? (value || '') : ''}
          onChange={onChange}
          options={options}
        />
      </Grid>
      <Grid item xs={8} style={{ display: 'flex', alignItems: 'center' }}>
        <AudioUploader
          onSuccess={handleUploadSuccess}
        />
      </Grid>
    </Grid>
  );
};

export default AudioSelector;
