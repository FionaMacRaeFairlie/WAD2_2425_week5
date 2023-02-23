const express = require('express')
const app = express()

app.get('/b', (req, res, next) => {
  console.log('/b: route not terminated')
  next()
})
app.use((req, res, next) => {
  console.log('SOMETIMES')
  next()
})
app.get('/b', (req, res, next) => {
  console.log('/b (part 2): error thrown' )
  throw new Error('b failed')
})
app.use('/b', (err, req, res, next) => {
  console.log('/b error detected and passed on')
  next(err)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log( `Express started on http://localhost:${port}` +
  '; press Ctrl-C to terminate.'))