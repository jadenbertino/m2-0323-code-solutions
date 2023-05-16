import express from 'express';
import { getFileContent, updateDatabase } from './fileUtils.js';
import { hasMatchingId, isPositiveInteger, isValidContent } from './validationUtils.js';

const app = express();
const PORT = 8080;
const NOTES_URL = '/api/notes';
const data = JSON.parse(await getFileContent('data.json'));
const { notes } = data;

app.use(express.json());

app.get(NOTES_URL + '/:id', function getNoteByID(req, res) {
  const noteId = req.params.id;

  if (!isPositiveInteger(noteId)) {
    return res
      .status(400)
      .json({ error: 'Note ID must be a positive integer' });
  }

  if (!hasMatchingId(noteId, notes)) {
    return res.status(404).json({ error: 'Specified Note ID does not exist.' });
  }

  res.status(200).json(notes[noteId]);
});

app.get(NOTES_URL, function getAllNotes(req, res) {
  res.status(200).json(Object.values(notes));
});

app.post(NOTES_URL, function createNote(req, res) {
  const content = req.body.content;

  if (!isValidContent(content)) {
    return res.status(400).json({
      error: "Must specify a 'content' property in the request body."
    });
  }

  try {
    const newNote = { id: data.nextId, content };
    notes[data.nextId] = newNote;
    data.nextId++;
    updateDatabase(data);
    res.status(201).json(newNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.delete(NOTES_URL + '/:id', function deleteNote(req, res) {
  const noteId = req.params.id;

  if (!isPositiveInteger(noteId)) {
    return res
      .status(400)
      .json({ error: 'Note ID must be a positive integer' });
  }

  if (!hasMatchingId(noteId, notes)) {
    return res.status(404).json({ error: 'Specified Note ID does not exist.' });
  }

  try {
    delete notes[noteId];
    updateDatabase(data);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.put(NOTES_URL + '/:id', function updateNote(req, res) {
  const content = req.body.content;
  const noteId = req.params.id;

  if (!isPositiveInteger(noteId)) {
    return res
      .status(400)
      .json({ error: 'Note ID must be a positive integer' });
  }

  if (!hasMatchingId(noteId, notes)) {
    return res.status(404).json({ error: 'Specified Note ID does not exist.' });
  }

  if (!isValidContent(content)) {
    return res.status(400).json({
      error: "Must specify a 'content' property in the request body."
    });
  }

  try {
    const newNote = {
      id: noteId,
      content
    };
    notes[noteId] = newNote;
    updateDatabase(data);
    res.status(200).json(newNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
