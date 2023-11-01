import express from 'express'
const router = express.Router()
import connectMongoDB from './connection.js'
import userRouter from './routes/user.js'
import logResRes from './Middleware/logReqRes.js'
const app = express()
const PORT = 8000

// Connection to MongoDB
connectMongoDB('mongodb://127.0.0.1:27017/youtube-app-2')
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(err => {
    console.log('Error connecting to MongoDB', err)
  })

// MIDDLEWARES
app.use(logResRes('logs.txt'))
app.use(express.urlencoded({ extended: false }))

// ROUTES
app.use('/api/user', userRouter)

// listen to the port
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})
