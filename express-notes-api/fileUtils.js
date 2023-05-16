import { Buffer } from 'node:buffer';
import { readFile, writeFile } from 'node:fs/promises';

export async function getFileContent(file) {
  try {
    const filePath = new URL(file, import.meta.url);
    const fileContent = await readFile(filePath, { encoding: 'utf8' });
    return fileContent;
  } catch (err) {
    console.log(err);
  }
}

export async function writeToFile(file, textContent) {
  try {
    if (!file) throw new TypeError('writeToFile called with undefined "file" argument');
    if (!textContent) throw new TypeError('writeToFile called with undefined "textContent" argument');

    const textToWrite = new Uint8Array(Buffer.from(textContent));
    await writeFile(file, textToWrite);

  } catch (err) {
    console.error(err);
  }
}

export async function updateDatabase(data) {
  await writeToFile('data.json', JSON.stringify(data, null, '\t'));
}

export async function getData() {
  const data = JSON.parse(await getFileContent('data.json'));
  return data;
}