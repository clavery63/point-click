const { generateValidPaths } = require('./ts-morph');
const { generateGameStateSchema } = require('./typescript-json-schema');

generateGameStateSchema();
generateValidPaths();
console.log('Validators generated successfully.')
