import React, { useState } from 'react';
import Button from '@mui/material/Button';
import S3 from 'shared/util/S3';
import { Stack, TextField } from '@mui/material';
import { GameState, VerbIndex } from 'game/store/types';
import { useHistory } from 'react-router-dom';

const defaultVerbNames = [
  'MOVE',
  'LOOK',
  'OPEN',
  'USE',
  'SMOKE',
  'TAKE',
  'EAT',
  'HIT',
  'SPEAK',
];

const defaultGame: GameState = {
  worldState: {
    doors: {},
    entities: {},
    rooms: {},
  },
  playerState: {
    verb: 0 as VerbIndex,
    room: 0,
    page: 0,
    examining: null,
    items: [],
  },
  flags: [],
  verbNames: defaultVerbNames,
};

const CreateGameButton = () => {
  const [gameName, setGameName] = useState<string>('');
  const history = useHistory();

  const createGame = async () => {
    if (gameName?.length) {
      const s3 = new S3();
      const result = await s3.writeObject(`${gameName}/gamedata.json`, JSON.stringify(defaultGame));
      if (result.$metadata.httpStatusCode === 200) {
        history.push(`/admin/${gameName}`);
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
      <Button onClick={createGame}>Create Game</Button>
    </Stack>
  );
};

export default CreateGameButton;
