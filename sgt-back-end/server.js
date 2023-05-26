// pool setup
import pg from 'pg';

// express setup
import express from 'express';
const dbName = 'studentGrades';
const db = new pg.Pool({
  connectionString: `postgres://dev:dev@localhost/${dbName}`,
  ssl: {
    rejectUnauthorized: false // Allow non-SSL traffic to localhost
  }
});
const app = express();
const PORT = 8080;
app.use(express.json());

class CustomError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

app.get('/api/grades', async (req, res, next) => {
  try {
    const sql = `
      SELECT *
      FROM "grades";
    `;
    const { rows: grades } = await db.query(sql);
    res.status(200).json(grades);
  } catch (err) {
    next(err);
  }
});

app.post('/api/grades', async (req, res, next) => {
  /*
    POST /api/grades inserts a new grade into the "grades" table and returns the created grade.
    The client should receive an object, not an array.
    The result could be a 201, 400, or 500.
      201 because the grade was successfully inserted
      400 because the client may supply an invalid grade, including a missing name, course, or score. Or the score isn't an integer from 0 to 100
      500 or the query may fail
  */

  try {
    // body param validation
    const { name, course, score: scoreStr } = req.body;
    const score = Number(scoreStr);
    const invalidBodyParams =
      typeof name !== 'string' ||
      typeof course !== 'string' ||
      !(Number.isInteger(score) && score >= 0 && score <= 100);
    if (invalidBodyParams) {
      throw new CustomError(
        400,
        "Invalid request body parameters. Please provide valid values for 'name' (string), 'course' (string), and 'score' (integer between 0 and 100, inclusive)."
      );
    }

    // create grade
    const sql = `
      INSERT INTO "grades" ("name", "course", "score")
      values ($1, $2, $3);
    `;
    const { rows: grades } = await db.query(sql, [name, course, score]);
    console.log(grades);
    res.status(201).json(grades[0]);
  } catch (err) {
    next(err);
  }
});

app.use(function handleErrors(err, req, res, next) {
  if (err instanceof CustomError) {
    const { statusCode, message } = err;
    res.status(statusCode).json({ error: message });
  } else {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
