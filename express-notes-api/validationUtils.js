export function isPositiveInteger(str) {
  const positiveIntegerRegex = /^[1-9]\d*$/;
  return positiveIntegerRegex.test(str);
}

export function hasMatchingId(id, notes) {
  return notes[id];
}

export function isValidContent(str) {
  const invalidValues = [undefined, 'null', 'undefined'];
  return invalidValues.findIndex(invalidValue => invalidValue === str) === -1;
}
