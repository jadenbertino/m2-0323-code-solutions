import getFileContent from './getFileContent.js';

const fileContent = await getFileContent('./dijkstra.txt');
console.log(fileContent);