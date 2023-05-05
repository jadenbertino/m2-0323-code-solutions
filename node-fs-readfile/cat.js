import getFileContent from './getFileContent.js';

async function concacenate(filesToRead) {
  const pendingFileContents = filesToRead.map(file => getFileContent(file));
  const fileContents = await Promise.all(pendingFileContents);
  return fileContents.join('\n')
}

const filesToRead = process.argv.slice(2);
const fileContents = await concacenate(filesToRead);
console.log(fileContents);