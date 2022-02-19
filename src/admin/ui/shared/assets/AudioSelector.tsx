import React, { useEffect, useState } from 'react';
import { Nullable } from 'game/store/types';
import Grid from '@material-ui/core/Grid';
import S3 from 'shared/util/S3';
import { _Object } from '@aws-sdk/client-s3';
import { useParams } from 'react-router-dom';
import Selector from '../Selector';

// TODO: dedup with the other getFilenames
const getFilenames = (objects: _Object[], gameKey: string) => objects
  .map(({ Key }) => Key?.match(new RegExp(`${gameKey}/audio/(.*)`)))
  .map(result => (result && result[1]) as string) // <--typescript fail
  .filter(Boolean);

const loadAudios = async (gameName: string) => {
  const s3 = new S3(`${gameName}/audio`);
  const objects = await s3.listObjects();

  return getFilenames(objects || [], gameName);
};

type Props = {
  label: string;
  value: Nullable<string>;
  onChange: (value: string) => void;
};
const AudioSelector = ({ label, value, onChange }: Props) => {
  const { gameName } = useParams<{ gameName: string }>();
  const [options, setOptions] = useState<string[]>([]);
  useEffect(() => {
    loadAudios(gameName).then(setOptions);
  }, []);

  return (
    <Grid container>
      <Grid item xs={4}>
        <Selector
          label={label}
          value={value}
          onChange={onChange}
          options={options}
        />
      </Grid>
      {/* <Grid item xs={8} style={{ display: 'flex', alignItems: 'center' }}>
        <AudioUploader
          onSuccess={handleUploadSuccess}
        />
      </Grid> */}
    </Grid>
  );
};

export default AudioSelector;
