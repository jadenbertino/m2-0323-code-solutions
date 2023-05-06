import { readFile } from 'node:fs/promises';

export default async function getFileContent(path) {
  try {
    const filePath = new URL(path, import.meta.url);
    const fileContent = await readFile(filePath, { encoding: 'utf8' });
    return fileContent;
  } catch (err) {
    console.error(err.message);
  }
}