import { Buffer } from 'node:buffer';
import { writeFile } from 'node:fs/promises';

export default async function writeToFile(file, msg) {
  try {
    if (!file) throw new TypeError(`writeToFile called with undefined "file" argument`);
    if (!msg) throw new TypeError(`writeToFile called with undefined "msg" argument`);
    const textToWrite = new Uint8Array(Buffer.from(existingText + msg));
    await writeFile(file, textToWrite);
  } catch (err) {
    console.error(err);
  }
}