import express from 'express';
import { getData, updateDatabase } from './fileUtils.js';
import { validateContent, validateId } from './validationUtils.js';

const app = express();
const PORT = 8080;
const NOTES_URL = '/api/notes';

app.use(express.json());

app.get(NOTES_URL + '/:id', async function getNoteByID(req, res) {
  const { notes } = await getData();
  const noteId = req.params.id;
  validateId(noteId, notes, res);
  res.status(200).json(notes[noteId]);
});

app.get(NOTES_URL, async function getAllNotes(req, res) {
  const { notes } = await getData();
  res.status(200).json(Object.values(notes));
});

app.post(NOTES_URL, async function createNote(req, res) {
  let { notes, nextId } = await getData();
  const content = req.body.content;
  validateContent(content, res);

  try {
    const newNote = { id: nextId, content };
    notes[nextId] = newNote;
    nextId++;
    await updateDatabase({ nextId, notes });
    res.status(201).json(newNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.delete(NOTES_URL + '/:id', async function deleteNote(req, res) {
  const { notes, nextId } = await getData();
  const noteId = req.params.id;
  validateId(noteId, notes, res);

  try {
    delete notes[noteId];
    await updateDatabase({ nextId, notes });
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.put(NOTES_URL + '/:id', async function updateNote(req, res) {
  const { notes, nextId } = await getData();
  const content = req.body.content;
  const noteId = req.params.id;
  validateId(noteId, notes, res);
  validateContent(content, res);

  try {
    const newNote = {
      id: Number(noteId),
      content
    };
    notes[noteId] = newNote;
    updateDatabase({ nextId, notes });
    res.status(200).json(newNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
