import React, { useState } from 'react';
import Button from '@mui/material/Button';
import S3 from 'shared/util/S3';
import { Stack, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';
import getDefaultGameState from 'game/store/defaults/getDefaultGameState';
import api from 'admin/api';

const generateSlug = (name: string) => {
  return name.toLowerCase().replace(/[^\w]+/g, '-');
};

const CreateGameButton = () => {
  const [gameName, setGameName] = useState<string>('');
  const history = useHistory();

  const createGame = async () => {
    const s3 = new S3();
    const slug = generateSlug(gameName);
    const gameData = JSON.stringify(getDefaultGameState(gameName));
    const s3Result = await s3.writeObject(`${slug}/gamedata-draft.json`, gameData);
    if (s3Result.$metadata.httpStatusCode !== 200) {
      console.log(`Tried to create game but got response of ${s3Result.$metadata.httpStatusCode}`);
      return;
    }

    const { error } = await api('createGame', slug, '');

    if (error) {
      console.log(`Tried to save game to db but got this error: ${error}`);
      return;
    }

    history.push(`/admin/${slug}`);
  };

  return (
    <Stack direction="row">
      <TextField
        label="Game Name"
        value={gameName}
        onChange={e => setGameName(e.target.value)}
        variant="outlined"
      />
      <Button onClick={createGame} disabled={!gameName.length}>Create Game</Button>
    </Stack>
  );
};

export default CreateGameButton;
