const fs = require('fs');
const TJS = require('typescript-json-schema');

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
  refs: false,
};

const generateGameStateSchema = () => {
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
            ValuePath: valueType,
          },
        };
      }
    }

    return {
      ...acc,
      [k]: replacePathLiterals(v),
    };
  }, {});

  const hackedSchema = replacePathLiterals(schema);

  const fileContents = `const gameStateSchema = ${JSON.stringify(hackedSchema, null, 2)};

export default gameStateSchema;
`;

  fs.writeFileSync('src/shared/validation/generated/gameStateSchema.js', fileContents);
};

module.exports = {
  generateGameStateSchema,
};
