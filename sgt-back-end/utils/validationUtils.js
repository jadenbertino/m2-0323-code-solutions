export class CustomError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export function validateId(id) {
  const isValidId = Number.isInteger(id) && id > 0;
  if (!isValidId) {
    throw new CustomError(
      400,
      "Please provide a valid query parameter for 'gradeId' (positive integer)"
    );
  }
}

export function validateGrade(name, course, score) {
  const invalidBodyParams =
    typeof name !== 'string' ||
    typeof course !== 'string' ||
    !(Number.isInteger(score) && score >= 0 && score <= 100);
  if (invalidBodyParams) {
    throw new CustomError(
      400,
      "Please provide valid request body parameters for 'name' (string), 'course' (string), and 'score' (integer between 0 and 100, inclusive)."
    );
  }
}

export function catchAsyncErrors(asyncCallback) {
  return function (req, res, next) {
    asyncCallback(req, res, next).catch(next);
  };
}
