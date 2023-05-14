import express from 'express';
import getFileContent from './getFileContent.js';
import writeToFile from './writeToFile.js';

const app = express();
const PORT = 8080;
const NOTES_URL = '/api/notes';

// const notes = process.argv.slice(2);
// const formattedNotes = notes.join('\n');
// writeToFile('note.txt', formattedNotes);
const data = JSON.parse(await getFileContent('data.json'));
const { notes } = data;

app.use(express.json());

// Get note by ID
app.get(NOTES_URL + '/:id', (req, res) => {
  // TODO: /api/notes/ (as in no ID provided) throws an error: "SyntaxError: Unexpected token o in JSON at position 1"
  const noteID = req.params.id;
  const positiveIntegerRegex = /^[1-9]\d*$/;
  const hasMatchingID = noteID < data.nextID;

  if (req.body === undefined || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Please specify a note ID to access.' });
  }

  if (!positiveIntegerRegex.test(noteID)) {
    return res
      .status(400)
      .json({ error: 'Note ID must be a positive integer' });
  }
  
  if (!hasMatchingID) {
    return res
      .status(404)
      .json({ error: 'Specified Note ID does not exist.' });
  }

  res.status(200).json(notes[noteID]);
});

// Get all notes
app.get(NOTES_URL, (req, res) => {
  const notesJSON = JSON.parse(notes);
  res.status(200).json(notesJSON);
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
