/* eslint-disable */

import express from 'express';
import getFileContent from './getFileContent.js';
import writeToFile from './writeToFile.js';

const app = express();
const PORT = 8080;
const NOTES_URL = '/api/notes';
const data = JSON.parse(await getFileContent('data.json'));
const { notes } = data;

// const notes = process.argv.slice(2);
// const formattedNotes = notes.join('\n');
// writeToFile('note.txt', formattedNotes);

app.use(express.json());

app.get(NOTES_URL + '/:id', function getNoteByID(req, res) {
  const noteID = req.params.id;
  const positiveIntegerRegex = /^[1-9]\d*$/;
  const hasMatchingID = noteID < data.nextID;

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

  res
    .status(200)
    .json(notes[noteID]);
});

app.get(NOTES_URL, function getAllNotes(req, res) {
  res
    .status(200)
    .json(notes);
});

app.post(NOTES_URL, function createNewNote(req, res) {
  const content = req.body.content;
  
  if (content === undefined)  { // { || content === 'null' || content === 'undefined') {
    return res
      .status(400)
      .json({ error: "Must specify a 'content' property in the request body." });
  }
  
  try {
    const newNote = {
      id: data.nextID,
      content
    }
    notes.push({ [data.nextID]: newNote });
    data.nextID++;
    res
      .status(201)
      .json(newNote);
  } catch {
    res
      .status(500)
      .json({ error: "Internal server error." })
  }
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
