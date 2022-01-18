const tsj = require("ts-json-schema-generator");
const fs = require("fs");

/**
 * This seems to be the preferred typescript->json schema generator, but it
 * can't handle template literals as of 1/18/22, so we're tableing it for now
 * 
 * Maybe I'm the one who has to submit that PR...
 */
const config = {
    path: "../../src/game/store/types.ts",
    tsconfig: "../../tsconfig.json",
    type: "Effect"
};

try {
  const schema = tsj.createGenerator(config).createSchema(config.type);
  const schemaString = JSON.stringify(schema, null, 2);
  console.log(schemaString);
} catch (e) {
  console.log('h')
  console.log(e.stack)
}
