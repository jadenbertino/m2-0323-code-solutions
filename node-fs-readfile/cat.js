import readFileContents from "./readFileContents.js"

async function concacenate(filesToRead) {
  const fileContents = filesToRead.map(file => readFileContents(file))
  return await Promise.all(fileContents)
}

const filesToRead = process.argv.slice(2)
concacenate(filesToRead)