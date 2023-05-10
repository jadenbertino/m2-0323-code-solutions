import express from 'express';
const app = express();
const PORT = 8080;

const grades = {
  12: {
    id: 12,
    name: 'Tim Berners-Lee',
    course: 'HTML',
    score: 95
  },
  47: {
    id: 47,
    name: 'Brendan Eich',
    course: 'JavaScript',
    score: 100
  },
  273: {
    id: 273,
    name: 'Forbes Lindsay',
    course: 'JavaScript',
    score: 92
  }
};

app.get('/api/grades', (req, res) => {
  res.json(Object.values(grades));
});

app.delete('/api/grades/:id', (req, res) => {
  const id = req.params.id
  delete grades[id]
  res.sendStatus(204)
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT} 👂`);
});