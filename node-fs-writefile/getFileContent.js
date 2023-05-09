import { readFile } from 'node:fs/promises';

export default async function getFileContent(file) {
  try {
    const filePath = new URL(file, import.meta.url);
    const fileContent = await readFile(filePath, { encoding: 'utf8' });
    return fileContent;
  } catch {
    return ''
  }
}