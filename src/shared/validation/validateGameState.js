import Ajv from 'ajv';

const testData = {
  playerState: {
    items: [],
    page: 2,
    timer: 0,
    room: 0,
    verb: 'EAT'
  },
  worldState: {
    doors: [],
    items: [
      {
        description: 'test',
        type: 'items',
        id: 0,
        name: 'hi',
        verbs: {
          EAT: [{
            effects: [{
              action: 'SET_NUMBER_VALUE',
              path: 'chris',
              value: 0
            }]
          }]
        }
      }
    ],
    rooms: [],
    scenery: []
  }
};

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
  
  const validate = ajv.compile(hackedSchema);
  const valid = validate(data);
  if (!valid) {
    throw new Error(validate.errors);
  };
};

export default validateGameState;
