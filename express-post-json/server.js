import express from 'express';
const app = express();

const PORT = 8080;
const GRADES_URL = '/api/grades';

let nextID = 1;
const grades = [];

app.use(express.json());

app.get(GRADES_URL, (req, res) => {
  res.json(grades);
});

app.post(GRADES_URL, (req, res) => {
  const gradesUpdate = { ...req.body, nextID };
  grades.push(gradesUpdate);
  res.status(201).json(gradesUpdate);
  nextID++;
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
