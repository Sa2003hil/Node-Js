import express from 'express'
import fs from 'fs'
const app = express()
import morgan from 'morgan' // this is the 3rd- party middleware for making Logs

app.use(morgan('dev'))
// Middleware - authentication
app.use(express.json()) // body parser

const auth = (req, res, next) => {
  //   console.log(req.query)
  if (req.body.password == '1234') {
    next()
  } else {
    res.sendStatus(401)
  }
}

// app.use(auth)

app.use('/signIn', auth, (req, res) => {
  //   console.log('A new request received at ' + Date.now())
  //   res.send('Hello World')
  res.json({ message: 'Welcome to the Login Page' })
})

app.get('/api/users', (req, res) => {
  //   console.log('users')
  res.json({ message: 'Got a GET request at /users' })
})

app.post('/api/users', (req, res) => {
  res.json({ message: 'Got a POST request' })
})

// Listen to port 8000
app.listen(8000, () => {
  console.log('server started')
})
