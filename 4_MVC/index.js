// MVC - Model View Controller is a design pattern for structuring our code
import express from 'express'
const app = express()
const PORT = 8001

const productRouter = express.Router()

import {
  newUser,
  allUsers,
  oneUser,
  editUser,
  deleteUser
} from './controller/user.js'

// MIDDLEWARES - Plugins
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api', productRouter)

// CONTROLLERS

// ROUTES

// app.post('/api/users', newUser)
// app.get('/api/users', allUsers)
// app.get('/api/users/:id', oneUser)
// app.patch('/api/users/:id', editUser)
// app.delete('/api/users/:id', deleteUser)

productRouter
  .post('/users', newUser)
  .get('/users', allUsers)
  .get('/users/:id', oneUser)
  .patch('/users/:id', editUser)
  .delete('/users/:id', deleteUser)

// listening to the server
app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`)
})
