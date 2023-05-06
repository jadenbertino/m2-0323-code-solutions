import getFileContent from './getFileContent.js';
import writeToFile from './writeToFile.js';

const [, , sourceFile, destinationFile] = process.argv;
const sourceText = await getFileContent(sourceFile)
// if destinationFile exists it will append sourceText to it, otherwise it will create destinationFile
await writeToFile(destinationFile, sourceText);