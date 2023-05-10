import express from 'express';
const app = express()
const PORT = 8080

app.use((req, res) => {
  console.log(req.method)
  res.send('<h1>HOLA MUNDO !!</h1>')
})

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
})
