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
const PORT = 3333;
app.use(express.json());

app.get('/api/grades', async (req, res, next) => {
  try {
    const sql = `
      select *
      from "grades";
    `;
    const { rows: grades } = await db.query(sql);
    res.status(200).json(grades);
  } catch (err) {
    next(err);
  }
});

app.use(function handleErrors(err, req, res, next) {
  console.log(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
