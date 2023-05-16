import express from 'express';
const app = express();

const PORT = 8080;
const GRADES_URL = '/api/grades';
let nextID = 1;
const grades = {};

app.use(express.json());

app.get(GRADES_URL, function getAllGrades(req, res) {
  res.json(Object.values(grades));
});

app.post(GRADES_URL, function addNewGrade(req, res) {
  const newGrade = { ...req.body, id: nextID };
  grades[nextID] = newGrade;
  nextID++;
  res.status(201).json(newGrade);
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
