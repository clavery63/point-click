import Ajv from 'ajv';
import gameStateSchema from './generated/gameStateSchema';

const validateGameState = gameState => {
  const ajv = new Ajv();

  ajv.addKeyword({
    keyword: "ValuePath",
    type: "string",
    validate: (schema, data) => {
      console.log('schema', schema);
      console.log('data:', data);
      return data === 'chris';
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
