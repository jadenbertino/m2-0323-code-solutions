import express from 'express';
import pg from 'pg';
import {
  CustomError,
  validateGrade,
  validateId
} from './utils/validationUtils.js';

const dbName = 'studentGrades';
const db = new pg.Pool({
  connectionString: `postgres://dev:dev@localhost/${dbName}`,
  ssl: {
    rejectUnauthorized: false // Allow non-SSL traffic to localhost
  }
});
const app = express();
const PORT = 8080; // only port that works with docker configuration I believe
app.use(express.json());

/**
 * Get all grades
 */
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

/**
 * Get grade by ID
 */
app.get('/api/grades/:gradeId', async (req, res, next) => {
  try {
    const gradeId = Number(req.params.gradeId);
    validateId(gradeId);

    const sql = `
      select *
        from "grades"
      where "gradeId" = $1
    `;
    const { rows } = await db.query(sql, [gradeId]);
    const grade = rows[0];
    if (!grade) {
      throw new CustomError(404, `Cannot find grade with 'gradeId' ${gradeId}`);
    }
    res.status(200).json(grade);
  } catch (err) {
    next(err);
  }
});

/**
 * Create new grade
 */
app.post('/api/grades', async (req, res, next) => {
  try {
    const { name, course, score: scoreStr } = req.body;
    const score = Number(scoreStr);
    validateGrade(name, course, score);

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

/**
 * Update grade
 */
app.put('/api/grades/:gradeId', async (req, res, next) => {
  try {
    const gradeId = Number(req.params.gradeId);
    validateId(gradeId);

    const { name, course, score: scoreStr } = req.body;
    const score = Number(scoreStr);
    validateGrade(name, course, score);

    const sql = `
      UPDATE "grades"
      SET 
        "name" = $1,
        "course" = $2,
        "score" = $3
      WHERE "gradeId" = $4
      RETURNING *;
    `;
    const { rows: grades } = await db.query(sql, [
      name,
      course,
      score,
      gradeId
    ]);
    const updatedGrade = grades[0];
    if (!updatedGrade) {
      throw new CustomError(404, `No grade with gradeId ${gradeId} found.`);
    }
    res.status(200).json(updatedGrade);
  } catch (err) {
    next(err);
  }
});

/**
 * Delete Grade
 */
app.delete('/api/grades/:gradeId', async (req, res, next) => {
  try {
    const gradeId = Number(req.params.gradeId);
    validateId(gradeId);

    const sql = `
      DELETE FROM "grades"
      WHERE "gradeId" = $1
      RETURNING *;
    `;
    const { rows } = await db.query(sql, [gradeId]);
    const deletedGrade = rows[0];
    if (!deletedGrade) {
      throw new CustomError(404, `No grade with gradeId ${gradeId} found.`);
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

/**
 * Handle Errors
 */
app.use((err, req, res, next) => {
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
