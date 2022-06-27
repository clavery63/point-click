import React, { useState } from 'react';
import Button from '@mui/material/Button';
import S3 from 'shared/util/S3';
import { Stack, TextField } from '@mui/material';
import { GameState, VerbIndex } from 'game/store/types';
import { useHistory } from 'react-router-dom';

// TODO: This definitely shouldn't be here
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

type GenerateGame = (friendlyName: string) => GameState;
const generateGame: GenerateGame = friendlyName => ({
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
  config: {
    verbs: defaultVerbNames,
    friendlyName,
    img: {},
    colors: {
      background: '#ebe6af',
    },
    positions: {
      verbs: [
        { left: 15, top: 7 },
        { left: 68, top: 15 },
        { left: 68, top: 31 },
        { left: 68, top: 47 },
        { left: 68, top: 63 },
        { left: 118, top: 15 },
        { left: 118, top: 31 },
        { left: 118, top: 47 },
        { left: 118, top: 63 },
      ],
      pageDown: { left: 175, top: 15 },
      pageUp: { left: 175, top: 31 },
      self: { left: 175, top: 47 },
      save: { left: 175, top: 63 },
      miniMap: { left: 15, top: 23 },
    },
  },
});

const CreateGameButton = () => {
  const [gameName, setGameName] = useState<string>('');
  const history = useHistory();

  const createGame = async () => {
    if (gameName.length) {
      const s3 = new S3();
      const slug = generateSlug(gameName);
      const gameData = JSON.stringify(generateGame(gameName));
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
