import React, { useState } from 'react';
import Button from '@mui/material/Button';
import S3 from 'shared/util/S3';
import { Stack, TextField } from '@mui/material';
import { VerbIndex } from 'game/store/types';
import { useHistory } from 'react-router-dom';

const defaultVerbNames = [
  {
    name: 'MOVE',
    defaultText: 'blah',
  },
  {
    name: 'LOOK',
    defaultText: 'blah',
  },
  {
    name: 'OPEN',
    defaultText: 'blah',
  },
  {
    name: 'USE',
    defaultText: 'blah',
  },
  {
    name: 'SMOKE',
    defaultText: 'Smoking that would be ill-advised!',
  },
  {
    name: 'TAKE',
    defaultText: 'blah',
  },
  {
    name: 'HIT',
    defaultText: 'Ya blew it. That really hurt.',
  },
  {
    name: 'EAT',
    defaultText: "Don't eat that.",
  },
  {
    name: 'SPEAK',
    defaultText: 'No response.',
  },
];

const generateSlug = (name: string) => {
  return name.toLowerCase().replace(/[^\w]+/g, '-');
};

const generateGame = (friendlyName: string) => ({
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
  friendlyName,
});

const CreateGameButton = () => {
  const [gameName, setGameName] = useState<string>('');
  const history = useHistory();

  const createGame = async () => {
    if (gameName?.length) {
      const s3 = new S3();
      const slug = generateSlug(gameName);
      const gameData = JSON.stringify(generateGame(gameName));
      const result = await s3.writeObject(`${slug}/gamedata.json`, gameData);
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
      <Button onClick={createGame}>Create Game</Button>
    </Stack>
  );
};

export default CreateGameButton;
