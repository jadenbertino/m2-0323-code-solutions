import express from 'express';
const app = express();
const PORT = 8080;

let nextID = 1;
const grades = {};

app.get('/api/grades', (req, res) => {
  res.json(grades);
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
