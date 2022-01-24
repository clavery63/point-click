const { Project } = require('ts-morph');

/**
 * This script generates a list of valid type strings for union types like
 * NumberPath that employ a lot of compile-time trickery. The schema-generation
 * libraries I'm looking at aren't able to handle it (yet), so we treat it as a
 * special case.
 * 
 */

const project = new Project({
  tsConfigFilePath: 'tsconfig.json',
});

const filePath = 'src/shared/util/types.ts';

project.addSourceFilesAtPaths([filePath]);

const sourceFile = project.getSourceFileOrThrow(filePath);
const stupidInterface = sourceFile.getInterface('ValidationCreator');
const myType = stupidInterface.getPropertyOrThrow('numberPath').getType();

myType.compilerType.types.forEach(t => {
  console.log('--------')
  console.log('t.value:', t.value);
  console.log('t.texts:', t.texts);
  console.log('t.types:', t.types?.map(t => t.intrinsicName));
  console.log('\n');
})
