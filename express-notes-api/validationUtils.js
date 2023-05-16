/*

    ID VALIDATION

*/

function isPositiveInteger(str) {
  const positiveIntegerRegex = /^[1-9]\d*$/;
  return positiveIntegerRegex.test(str);
}

function hasMatchingId(id, notes) {
  return notes[id];
}

export function validateId(noteId, notes, res) {
  if (!isPositiveInteger(noteId)) {
    return res
      .status(400)
      .json({ error: 'Note ID must be a positive integer' });
  }

  if (!hasMatchingId(noteId, notes)) {
    return res.status(404).json({ error: 'Specified Note ID does not exist.' });
  }
}

/*

    CONTENT VALIDATION

*/

function isValidContent(content) {
  const invalidValues = [undefined, 'null', 'undefined'];
  return (
    invalidValues.findIndex(invalidValue => invalidValue === content) === -1
  );
}

export function validateContent(content, res) {
  if (!isValidContent(content)) {
    return res.status(400).json({
      error: "Must specify a 'content' property in the request body."
    });
  }
}
