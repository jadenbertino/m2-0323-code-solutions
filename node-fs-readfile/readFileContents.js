import { readFile } from 'node:fs/promises';

export default async function readFileContents(path) {
  try {
    const filePath = new URL(path, import.meta.url);
    const contents = await readFile(filePath, { encoding: 'utf8' });
    console.log(contents);
  } catch (err) {
    console.error(err.message);
  }
}