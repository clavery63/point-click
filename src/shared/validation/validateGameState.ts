import Ajv from 'ajv';
import { GameState } from 'game/store/types';
import gameStateSchema from './generated/gameStateSchema';
import { numberPaths } from './generated/validPaths';

type ValidPath = {
  value?: string;
  texts?: string[];
};

const escapeRegExp = (source: string) => {
  return source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const constructRegExp = (type: ValidPath) => {
  if (type.value) {
    return new RegExp(`^${type.value}$`);
  }

  const regExpString = (type.texts || [''])
    .map(escapeRegExp)
    .join('\\d');

  return new RegExp(`^${regExpString}$`);
};

const validateGameState = (gameState: GameState) => {
  const ajv = new Ajv();
  const numberPathRegExes = numberPaths.map(constructRegExp);

  ajv.addKeyword({
    keyword: 'ValuePath',
    type: 'string',
    validate: (schema: any, data: string) => {
      // TODO: at some point we might want to work for more than just number
      // paths, at which point we will actually look at `schema` to pick the
      // apropriate ValidPaths regex. phew!
      return numberPathRegExes.some(regEx => data.match(regEx));
    },
    error: {
      message: 'you blew it',
    },
  });

  const validate = ajv.compile(gameStateSchema);
  // TODO(maybe): seems this still accepts any superset of a valid config
  const valid = validate(gameState);
  if (!valid) {
    const errors = JSON.stringify(validate.errors, null, 2);
    console.log('Found some validation errors:', errors);
    throw new Error(errors); // Doesn't matter at this point
  } else {
    console.log('config is valid');
  }
};

export default validateGameState;
