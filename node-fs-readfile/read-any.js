import getFileContent from './getFileContent.js';

const fileToRead = process.argv[2];
const fileContents = await getFileContent(fileToRead);
console.log(fileContents);
