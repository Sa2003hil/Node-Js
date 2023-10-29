import express from 'express'
import fs from 'fs'
const app = express()
import morgan from 'morgan' // this is the 3rd- party middleware for making Logs

app.use(morgan('dev'))
// Middleware - authentication
app.use(express.json()) // body parser
app.use(express.static('public')) // this will help to serve the static files like html, css, js, images, etc.

// This is the Auth middlewaere for checking the password
const auth = (req, res, next) => {
  //   console.log(req.query)
  if (req.body.password == '1234') {
    next()
  } else {
    res.sendStatus(401)
  }
}
/*
Points to remember :-
 1. we can use this middleware for all the routes in one go 
 
 Syntax:-  app.use(auth)

 2. we can use this middleware for a specific route

  Syntax:- app.use('/signIn', auth, (req, res) => {
    res.json({ message: 'Welcome to the Login Page' })
  })

*/

// Example of using middleware for a specific route
app.use('/signIn', auth, (req, res) => {
  //   console.log('A new request received at ' + Date.now())
  //   res.send('Hello World')
  res.json({ message: 'Welcome to the Login Page' })
})

app.get('/api/users', (req, res) => {
  //   console.log('users')
  res.json({ message: 'Got a GET request at /users' })
})

// 1. Send data via URL in Query String
app.get('/api/new', (req, res) => {
  console.log(req.query)
  res.send(req.query)
})

// 2. Send data via URL in Path Parameters ( Send data via Request Params )
app.get('/api/demo/:name/:subject', (req, res) => {
  console.log(req.params) // Access route parameters
  res.json({ params: req.params }) // Send route parameters in response
})

// 3. Send data via Request Body
app.post('/api/latestdata', (req, res) => {
  console.log(req.body)
  res.json(req.body)
})

app.post('/api/users', (req, res) => {
  res.json({ message: 'Got a POST request' })
})

// Listen to port 8000
// app.listen(8000, () => {
//   console.log('server started')
// })

// Listen to port 8000 using env variable
const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
