import { Buffer } from 'node:buffer';
import { writeFile, open } from 'node:fs/promises';
import getFileContent from './getFileContent.js';

export default async function writeToFile(file, msg) {
  try {
    if (!file) throw new TypeError(`writeToFile called with undefined "file" argument`);
    if (!msg) throw new TypeError(`writeToFile called with undefined "msg" argument`);
    let existingText = await getFileContent(file);
    existingText && (existingText += '\n')
    const textToWrite = new Uint8Array(Buffer.from(existingText + msg));
    await writeFile(file, textToWrite);
  } catch (err) {
    console.error(err);
  }
}