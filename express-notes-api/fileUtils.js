import { Buffer } from 'node:buffer';
import { readFile, writeFile } from 'node:fs/promises';

/*
    READ
*/

async function getFileContent(file) {
  const filePath = new URL(file, import.meta.url);
  const fileContent = await readFile(filePath, { encoding: 'utf8' });
  return fileContent;
}

export async function getData() {
  const data = JSON.parse(await getFileContent('data.json'));
  return data;
}

/*
    WRITE
*/

async function writeToFile(file, textContent) {
  if (!file) throw new TypeError('writeToFile called with undefined "file" argument');
  if (!textContent) throw new TypeError('writeToFile called with undefined "textContent" argument');
  const textToWrite = new Uint8Array(Buffer.from(textContent));
  await writeFile(file, textToWrite);
}

export async function updateDatabase(data) {
  await writeToFile('data.json', JSON.stringify(data, null, '\t'));
}
