const TJS = require('typescript-json-schema');


/**
 * This generates a schema for our GameState which we can use for validation.
 * The one thing it can't handle well are those dynamically generated template
 * literal strings. For those we use ts-morph (which is just a wrapper for the
 * native typescipt compiler API)
 * 
 */

// optionally pass argument to schema generator
const settings = {
  required: true,
};

// optionally pass ts compiler options
const compilerOptions = {
  strictNullChecks: true,
  esModuleInterop: true,
  refs: false
};

const program = TJS.getProgramFromFiles(
['../../src/game/store/types.ts'],
compilerOptions,
);

// const schema = TJS.generateSchema(program, 'Item', settings);


const generator = TJS.buildGenerator(program, settings);

const hi = generator.getSchemaForSymbol('GameState');

// hi.definitions.Effect.properties.path.anyOf

console.log(JSON.stringify(hi, null, 2));
