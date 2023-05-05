import readFileContents from "./readFileContents.js"

async function concacenate(filesToRead) {
  const readFiles = filesToRead.map(file => readFileContents(file))
  const allFilepathContents = await Promise.all(readFiles)
  return allFilepathContents
}

const filesToRead = process.argv.slice(2)
concacenate(filesToRead)