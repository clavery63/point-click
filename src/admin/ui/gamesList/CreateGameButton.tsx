import React, { useState } from 'react';
import Button from '@mui/material/Button';
import S3 from 'shared/util/S3';
import { Stack, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';
import getDefaultGameState from 'game/store/defaults/getDefaultGameState';

const generateSlug = (name: string) => {
  return name.toLowerCase().replace(/[^\w]+/g, '-');
};

const CreateGameButton = () => {
  const [gameName, setGameName] = useState<string>('');
  const history = useHistory();

  const createGame = async () => {
    if (gameName.length) {
      const s3 = new S3();
      const slug = generateSlug(gameName);
      const gameData = JSON.stringify(getDefaultGameState(gameName));
      const result = await s3.writeObject(`${slug}/gamedata-draft.json`, gameData);
      if (result.$metadata.httpStatusCode === 200) {
        history.push(`/admin/${slug}`);
      }
    }
  };

  return (
    <Stack direction="row">
      <TextField
        label="Game Name"
        value={gameName}
        onChange={e => setGameName(e.target.value)}
        variant="outlined"
      />
      {!!gameName.length && <Button onClick={createGame}>Create Game</Button>}
    </Stack>
  );
};

export default CreateGameButton;
