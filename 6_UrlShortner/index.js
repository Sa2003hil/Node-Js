import express from 'express'
import connectToMongoDB from './connection.js'
import urlRoute from './Routes/url.js'
import URL from './Models/url.js'
const app = express()
const port = 8001

// connect to the mongodb
connectToMongoDB('mongodb://127.0.0.1:27017/urlShortner')
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch(err => {
    console.log(err)
  })

// Middleware
app.use(express.json())

// ROUTES
app.use('/url', urlRoute) // Here the routes are defined in the Routes folder

// listen to the port
app.listen(port, () => {
  console.log(`server is running at port ${port}`)
})
