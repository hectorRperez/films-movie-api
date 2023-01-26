const express = require('express')
const bodyParser = require('body-parser')
const apiRouter = require('./routes/api')

const app = express();

require('./db')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', apiRouter);

app.get("/", (req, res) => {
  res.send("hola GLG");
})

app.listen('4000', () => {
  console.log('hola');
})