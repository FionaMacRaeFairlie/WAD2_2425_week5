const express = require('express')
const app = express()

app.get('/a', (req, res) => {
  console.log('/a: route will send the letter a then stop')
  res.send('a')
})
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

app.use((err, req, res, next) => {
    console.log('unhandled error detected: ' + err.message)
    res.send('500 - server error')
  })
  
  app.use((req, res) => {
    console.log('route not handled')
    res.send('404 - not found')
  })
const port = process.env.PORT || 3000
app.listen(port, () => console.log( `Express started on http://localhost:${port}` +
  '; press Ctrl-C to terminate.'))