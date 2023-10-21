import express from 'express'
import http from 'http'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello from Home')
})

app.get('/about', (req, res) => {
  res.send(`Hello from ${req.query.name} your age is ${req.query.age} `)
})

// const myServer = http.createServer(app)
// // listening to the server
// myServer.listen(8000, () => {
//   console.log('server started')
// })

app.listen(8000, () => {
  console.log('server started')
})
