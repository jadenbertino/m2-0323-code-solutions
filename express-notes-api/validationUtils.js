export class CustomError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

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

export function validateId(noteId, notes) {
  if (!isPositiveInteger(noteId)) {
    throw new CustomError(400, 'Note ID must be a positive integer')
  }

  if (!hasMatchingId(noteId, notes)) {
    throw new CustomError(404, 'Specified Note ID does not exist.')
  }
}

/*

    CONTENT VALIDATION

*/

function isInvalidContent(content) {
  const invalidValues = [undefined, 'null', 'undefined'];
  return invalidValues.includes(content)
}

export function validateContent(content) {
  if (isInvalidContent(content)) {
    throw new CustomError(400, "Must specify a 'content' property in the request body.")
  }
}