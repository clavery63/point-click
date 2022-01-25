const fs = require('fs');
const { Project } = require('ts-morph');

/**
 * This script generates a list of valid type strings for union types like
 * NumberPath that employ a lot of compile-time trickery. The schema-generation
 * libraries I'm looking at aren't able to handle it (yet), so we treat it as a
 * special case.
 * 
 */

const generateValidPaths = () => {
  const project = new Project({
    tsConfigFilePath: 'tsconfig.json',
  });

  const filePath = 'src/shared/util/types.ts';

  project.addSourceFilesAtPaths([filePath]);

  const sourceFile = project.getSourceFileOrThrow(filePath);
  const interface = sourceFile.getInterface('ValidationCreator');
  const myType = interface.getPropertyOrThrow('numberPath').getType();

  const numberPaths = myType.compilerType.types.map(t => ({
    value: t.value,
    texts: t.texts,
    types: t.types?.map(t => t.intrinsicName)
  }));

  const fileContents =
`export const numberPaths = ${JSON.stringify(numberPaths, null, 2)};
`;
  
  fs.writeFileSync('src/shared/validation/generated/validPaths.js', fileContents);
};

module.exports = {
  generateValidPaths
};
