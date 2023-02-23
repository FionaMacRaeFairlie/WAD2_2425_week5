const express = require('express')
const app = express()

app.use((req, res, next) => {
  console.log('\n ALWAYS')
  next()
})

app.get('/a', (req, res) => {
  console.log('/a: route will be terminated by send')
  res.send('a')
})
app.get('/a', (req, res) => {
  console.log('/a: never called');
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log( `Express started on http://localhost:${port}` +
  '; press Ctrl-C to terminate.'))