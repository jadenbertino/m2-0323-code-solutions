// pool setup
import pg from 'pg';

// express setup
import express from 'express';
const dbName = 'studentGradeTable';
// eslint-disable-next-line
const db = new pg.Pool({
  connectionString: `postgres://dev:dev@localhost/${dbName}`,
  ssl: {
    rejectUnauthorized: false // Allow non-SSL traffic to localhost
  }
});
const app = express();
const PORT = 3333;
// eslint-disable-next-line
const BASE_URL = '/api';

app.use(express.json());

app.use(function handleErrors(err, req, res, next) {
  console.log(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
