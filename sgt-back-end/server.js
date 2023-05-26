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

app.get('/api/grades/:gradeId', async (req, res, next) => {
  try {
    // query param validation
    const gradeId = Number(req.params.gradeId);
    const isValidId = Number.isInteger(gradeId) && gradeId > 0;
    if (!isValidId) {
      throw new CustomError(
        400,
        "Please provide a query parameter for 'gradeId' (positive integer)"
      );
    }

    // get grade
    const sql = `
      select *
        from "grades"
      where "gradeId" = $1
    `;
    const { rows } = await db.query(sql, [gradeId]);
    const [grade] = rows;
    if (!grade) {
      throw new CustomError(404, `Cannot find grade with 'gradeId' ${gradeId}`);
    }
    res.status(200).json(grade);
  } catch (err) {
    next(err);
  }
});

app.post('/api/grades', async (req, res, next) => {
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
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const { rows: grades } = await db.query(sql, [name, course, score]);
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
