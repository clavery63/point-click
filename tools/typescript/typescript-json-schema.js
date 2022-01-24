const fs = require('fs');
const TJS = require('typescript-json-schema');
const Ajv = require("ajv");

/**
 * This generates a schema for our GameState which we can use for validation.
 * The one thing it can't handle well are those dynamically generated template
 * literal strings. For those we use ts-morph (which is just a wrapper for the
 * native typescipt compiler API)
 * 
 */

const settings = {
  required: true,
};

const compilerOptions = {
  strictNullChecks: true,
  esModuleInterop: true,
  refs: false
};

const program = TJS.getProgramFromFiles(
['src/game/store/types.ts'],
compilerOptions,
);

const generator = TJS.buildGenerator(program, settings);

const schema = generator.getSchemaForSymbol('GameState');

const replacePathLiterals = s => Object.entries(s).reduce((acc, [k, v]) => {
  if (typeof v !== 'object' || Array.isArray(v)) {
    return { ...acc, [k]: v };
  }

  if (typeof v.type === 'string') {
    const [pathKeyword, valueType] = v.type.split('-') || [];
    if (pathKeyword === 'path' && !!valueType) {
      return {
        ...acc,
        [k]: {
          type: 'string',
          ValuePath: valueType
        }
      }
    }
  }
  
  return {
    ...acc,
    [k]: replacePathLiterals(v)
  }
}, {});

const hackedSchema = replacePathLiterals(schema);

console.log(JSON.stringify(hackedSchema, null, 2));
const ajv = new Ajv();

ajv.addKeyword({
  keyword: "ValuePath",
  type: "string",
  validate: (schema, data) => {
    // TODO: here we would reference list of valid pathnames given a type.
    // That list along with the schema would be updated via a git hook
    // And placed in .js files to be used at runtime
    console.log('schema', schema);
    console.log('data:', data);
    return data === 'chris';
  },
  error: {
    message: 'you blew it'
  }
})

const validate = ajv.compile(hackedSchema);

const data = {
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

const valid = validate(data);
if (!valid) console.log(validate.errors);
