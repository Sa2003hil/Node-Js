// app.mjs
import express from 'express'
import users from './MOCK_DATA.json' assert { type: 'json' }
import fs from 'fs'
const app = express()
const PORT = 8001

// MIDDLEWARES - Plugins
app.use(express.urlencoded({ extended: false })) // this will help to put the data into req.body from the FORM data

// This is a Logger Middleware which will log the data of the user
app.use((req, res, next) => {
  console.log(
    req.method,
    req.hostname,
    req.ip,
    new Date(),
    req.get('User-Agent')
  )
  next()
})

// Dynamic Path Routing Optimised way ✅

app
  .route('/api/users/:id')
  .get((req, res) => {
    const id = Number(req.params.id)
    const user = users.find(user => user.id == id)
    res.json(user)
  })
  .patch((req, res) => {
    // TODO : Edit the user with id
    return res.json({ message: 'User created' })
  })
  .delete((req, res) => {
    // TODO : delete the user with id
    const body = req.body
    console.log('Body', body)
    users.pop({ ...body, id: users.length - 1 })
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
      return res.json({ message: 'User deleted' })
    })
  })

// POST req ✅
app.post('/api/users', (req, res) => {
  // TODO : create a new user

  const body = req.body
  console.log('Body', body) //this gives undefined because do not know that what type of data is this and how to handle this so we need to use middleware
  users.push({ ...body, id: users.length + 1 })
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    return res.json({ status: 'Success', id: users.length })
  })
})

// listening to the server
app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`)
})
