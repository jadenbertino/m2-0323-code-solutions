import express from 'express';
import { getData, updateDatabase } from './fileUtils.js';
import { CustomError, validateContent, validateId } from './validationUtils.js';

const app = express();
const PORT = 8080;
const NOTES_URL = '/api/notes';
app.use(express.json());

app.get(NOTES_URL + '/:id', async function getNoteByID(req, res, next) {
  const noteId = req.params.id;

  try {
    const { notes } = await getData();
    validateId(noteId, notes);
    res.status(200).json(notes[noteId]);
  } catch (err) {
    next(err);
  }
});

app.get(NOTES_URL, async function getAllNotes(req, res, next) {
  try {
    const { notes } = await getData();
    res.status(200).json(Object.values(notes));
  } catch (err) {
    next(err);
  }
});

app.post(NOTES_URL, async function createNote(req, res, next) {
  const content = req.body.content;

  try {
    let { notes, nextId } = await getData();
    validateContent(content);
    const newNote = { id: nextId, content };
    notes[nextId] = newNote;
    nextId++;
    await updateDatabase({ nextId, notes });
    res.status(201).json(newNote);
  } catch (err) {
    next(err);
  }
});

app.delete(NOTES_URL + '/:id', async function deleteNote(req, res, next) {
  const noteId = req.params.id;

  try {
    const { notes, nextId } = await getData();
    validateId(noteId, notes);
    delete notes[noteId];
    await updateDatabase({ nextId, notes });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

app.put(NOTES_URL + '/:id', async function updateNote(req, res, next) {
  const content = req.body.content;
  const noteId = req.params.id;

  try {
    const { notes, nextId } = await getData();
    validateId(noteId, notes);
    validateContent(content);
    const newNote = {
      id: Number(noteId),
      content
    };
    notes[noteId] = newNote;
    updateDatabase({ nextId, notes });
    res.status(200).json(newNote);
  } catch (err) {
    next(err);
  }
});

app.use(function handleErrors(err, req, res, next) {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
