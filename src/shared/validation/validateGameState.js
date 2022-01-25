import Ajv from 'ajv';
import gameStateSchema from './generated/gameStateSchema';
import { numberPaths } from './generated/validPaths';

const escapeRegExp = source => {
  return source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const constructRegExp = type => {
  if (type.value) {
    return new RegExp(`^${type.value}$`);
  }

  const regExpString = type.texts
    .map(escapeRegExp)
    .join('\\d');

  return new RegExp(`^${regExpString}$`);
};

const validateGameState = gameState => {
  const ajv = new Ajv();
  const numberPathRegExes = numberPaths.map(constructRegExp);

  ajv.addKeyword({
    keyword: "ValuePath",
    type: "string",
    validate: (schema, data) => {
      // TODO: at some point we might want to work for more than just number
      // paths, at which point we will actually look at `schema` to pick the
      // apropriate ValidPaths regex. phew!
      return numberPathRegExes.some(regEx => data.match(regEx));
    },
    error: {
      message: 'you blew it'
    }
  })
  
  const validate = ajv.compile(gameStateSchema);
  const valid = validate(gameState);
  if (!valid) {
    console.log(validate.errors);
    throw new Error(validate.errors);
  };
};

export default validateGameState;
