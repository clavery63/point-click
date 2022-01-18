const ts = require("typescript");

/**
 * First attempt at getting a list of generated template-literal types for 
 * runtime validation use. It can definitely be done with just the typescript
 * APIs, but for now I'm using ts-morph
 */

const filename = process.argv[2];
const program = ts.createProgram([filename], {});
const sourceFile = program.getSourceFile(filename);
const typeChecker = program.getTypeChecker();

const interfaceDeclaration = sourceFile.statements[sourceFile.statements.length - 1];
interfaceDeclaration.forEachChild((node) => {
  const myType = typeChecker.getTypeAtLocation(node);
  console.log('one')
  if (node.getText() !== 'ValidationCreator') {
    console.log('two:', node.getText())
    var method = node;
    var signature = typeChecker.getSignatureFromDeclaration(method);
    var returnType = typeChecker.getReturnTypeOfSignature(signature);
    var parameters = method.parameters;

    console.log("name: " + method.name.getText());
    console.log("return type: " + returnType.getConstraint());
    console.log("parameters: " + parameters);
  }
});
