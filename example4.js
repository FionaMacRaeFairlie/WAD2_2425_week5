const express = require('express')
const app = express()

app.get('/c', (req,res) => {
    console.log('/c: error thrown')
    throw new Error('c failed')
  })
app.use('/c', (err, req, res, next) => {
    console.log('/c: error detected in previous block but not passed on')
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