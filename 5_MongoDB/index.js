// MongoDB is a NoSQL database which is used to store the data in the form of JSON objects
import express from 'express'
import mongoose from 'mongoose'
const app = express()
import userRouter from './routes/user.js'
import connectMongoDB from './connection.js'
import logResRes from './middlewares/index.js'
const PORT = 8001

// Connection to MongoDB this return the promise
connectMongoDB('mongodb://127.0.0.1:27017/youtube-app-1')
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(err => {
    console.log('Error connecting to MongoDB', err)
  })

// MIDDLEWARES - Plugins (body-parser)
app.use(logResRes('logs.txt'))
app.use(express.urlencoded({ extended: false }))

// ROUTES
app.use('/api/user', userRouter)

// listening to the server
app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`)
})
